const MOCK_DELAY_MS = 900;
function delay(milliseconds) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}
export class MockAuthService {
    async register(input) {
        await delay(MOCK_DELAY_MS);
        const normalizedEmail = input.email.trim().toLowerCase();
        if (normalizedEmail === 'existente@syner.com') {
            throw new Error('EMAIL_ALREADY_EXISTS');
        }
        return {
            userId: crypto.randomUUID(),
            fullName: input.fullName.trim(),
            email: normalizedEmail,
            requiresEmailVerification: true,
        };
    }
}
export const authService = new MockAuthService();
