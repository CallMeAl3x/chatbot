import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "no-reply@bonefons.com",
    to: email,
    subject: "2FA Code",
    html: `<p>Votre 2FA code ${token}</p>`
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "no-reply@bonefons.com",
    to: email,
    subject: "Confirmer votre email",
    html: `<p>Clicker <a href="${confirmLink}">ici</a> pour confirmer votre email</p>`
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "no-reply@bonefons.com",
    to: email,
    subject: "Réinitialiser son mot de passe",
    html: `<p>Clicker <a href="${resetLink}">ici</a> pour réinitialiser votre mot de passe</p>`
  });
};
