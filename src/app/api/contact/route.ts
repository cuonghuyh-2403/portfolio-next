import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Validate
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Vui lòng điền đầy đủ thông tin.' }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Email không hợp lệ.' }, { status: 400 });
        }

        // Save to Supabase
        const { error: dbError } = await supabaseAdmin
            .from('contacts')
            .insert({
                name,
                email,
                message,
                read: false,
                created_at: new Date().toISOString(),
            });

        if (dbError) {
            console.error('❌ Supabase insert error:', JSON.stringify(dbError, null, 2));
            return NextResponse.json({ 
                error: 'Không thể lưu tin nhắn. Vui lòng thử lại.',
                details: dbError.message // Adding details for debugging
            }, { status: 500 });
        }

        console.log('✅ Message saved to Supabase');

        // Send email notification to admin
        try {
            const smtpEmail = process.env.SMTP_EMAIL;
            const smtpPassword = process.env.SMTP_PASSWORD;
            const adminEmail = process.env.ADMIN_EMAIL || smtpEmail;

            if (smtpEmail && smtpPassword) {
                console.log('📧 Attempting to send email...');
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
                    auth: {
                        user: smtpEmail,
                        pass: smtpPassword,
                    },
                });

                await transporter.sendMail({
                    from: `"Portfolio Contact" <${smtpEmail}>`,
                    to: adminEmail,
                    subject: `📬 Tin nhắn mới từ ${name}`,
                    html: `
                        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F5F0EB; padding: 2rem;">
                            <div style="border-bottom: 2px solid #E63946; padding-bottom: 1rem; margin-bottom: 1.5rem;">
                                <h2 style="margin: 0; color: #1a1a1a; font-size: 1.5rem;">Tin nhắn mới từ Portfolio</h2>
                            </div>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 0.8rem 0; color: #999; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px dotted #ccc; width: 80px;">Tên</td>
                                    <td style="padding: 0.8rem 0; color: #1a1a1a; font-weight: 600; border-bottom: 1px dotted #ccc;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0.8rem 0; color: #999; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px dotted #ccc;">Email</td>
                                    <td style="padding: 0.8rem 0; border-bottom: 1px dotted #ccc;"><a href="mailto:${email}" style="color: #E63946; text-decoration: none;">${email}</a></td>
                                </tr>
                            </table>
                            <div style="margin-top: 1.5rem; padding: 1.5rem; background: #ffffff; border-left: 3px solid #E63946;">
                                <p style="margin: 0; color: #1a1a1a; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                            </div>
                            <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ddd; color: #999; font-size: 0.75rem;">
                                Gửi từ portfolio — ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
                            </div>
                        </div>
                    `,
                });
                console.log('✅ Email sent successfully');
            } else {
                console.warn('⚠️ SMTP_EMAIL or SMTP_PASSWORD missing in environment variables');
            }
        } catch (emailError) {
            // Email sending failed but contact was saved — don't fail the request
            const msg = (emailError as any)?.message || String(emailError);
            console.error('❌ Email sending error:', msg);
        }

        return NextResponse.json({ success: true, message: 'Tin nhắn đã được gửi thành công!' });
    } catch (err) {
        console.error('Contact API error:', err);
        return NextResponse.json({ error: 'Lỗi server. Vui lòng thử lại.' }, { status: 500 });
    }
}
