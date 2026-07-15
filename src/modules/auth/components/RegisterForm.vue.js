import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/mock-auth.service';
const router = useRouter();
const form = reactive({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    acceptsTerms: false,
});
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
function validate() {
    if (!form.fullName.trim()) {
        return 'Ingresá tu nombre completo.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        return 'Ingresá un correo electrónico válido.';
    }
    if (form.password.length < 8) {
        return 'La contraseña debe contener al menos 8 caracteres.';
    }
    if (!/[A-Z]/.test(form.password)) {
        return 'La contraseña debe incluir al menos una mayúscula.';
    }
    if (!/[0-9]/.test(form.password)) {
        return 'La contraseña debe incluir al menos un número.';
    }
    if (form.password !== form.passwordConfirmation) {
        return 'Las contraseñas no coinciden.';
    }
    if (!form.acceptsTerms) {
        return 'Debés aceptar los términos y la política de privacidad.';
    }
    return null;
}
async function handleSubmit() {
    errorMessage.value = '';
    successMessage.value = '';
    const validationError = validate();
    if (validationError) {
        errorMessage.value = validationError;
        return;
    }
    loading.value = true;
    try {
        const result = await authService.register(form);
        successMessage.value = result.requiresEmailVerification
            ? 'Cuenta creada. En la versión final enviaremos un correo de verificación.'
            : 'Cuenta creada correctamente.';
        window.setTimeout(() => {
            void router.push('/onboarding');
        }, 1200);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
            errorMessage.value = 'Ese correo ya se encuentra registrado.';
            return;
        }
        errorMessage.value = 'No pudimos crear la cuenta. Intentá nuevamente.';
    }
    finally {
        loading.value = false;
    }
}
const __VLS_ctx = ({ ...{} });
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)(({
	onSubmit: __VLS_ctx.handleSubmit,
	...{ class: 'space-y-5' },
	novalidate: true
}));
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(({
	for: 'full-name',
	class: 'mb-2 block text-sm font-semibold text-slate-700'
}));
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-700']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)(({
	id: 'full-name',
	value: __VLS_ctx.form.fullName,
	type: 'text',
	name: 'fullName',
	autocomplete: 'name',
	placeholder: 'Ej. Hernán Constante',
	disabled: __VLS_ctx.loading,
	class: 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50'
}));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-sky-100']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-slate-50']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(({
	for: 'email',
	class: 'mb-2 block text-sm font-semibold text-slate-700'
}));
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-700']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)(({
	id: 'email',
	type: 'email',
	name: 'email',
	autocomplete: 'email',
	inputmode: 'email',
	placeholder: 'nombre@correo.com',
	disabled: __VLS_ctx.loading,
	class: 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50'
}));
(__VLS_ctx.form.email);
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-sky-100']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-slate-50']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(({
	for: 'password',
	class: 'mb-2 block text-sm font-semibold text-slate-700'
}));
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-700']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)(({
	id: 'password',
	type: 'password',
	name: 'password',
	autocomplete: 'new-password',
	placeholder: 'Mínimo 8 caracteres',
	disabled: __VLS_ctx.loading,
	class: 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50'
}));
(__VLS_ctx.form.password);
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-sky-100']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-slate-50']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(({ class: 'mt-2 text-xs leading-5 text-slate-500' }));
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(({
	for: 'password-confirmation',
	class: 'mb-2 block text-sm font-semibold text-slate-700'
}));
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-700']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)(({
	id: 'password-confirmation',
	type: 'password',
	name: 'passwordConfirmation',
	autocomplete: 'new-password',
	placeholder: 'Repetí tu contraseña',
	disabled: __VLS_ctx.loading,
	class: 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50'
}));
(__VLS_ctx.form.passwordConfirmation);
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-sky-100']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-slate-50']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(({ class: 'flex items-start gap-3' }));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)(({
	type: 'checkbox',
	disabled: __VLS_ctx.loading,
	class: 'mt-1 size-4 shrink-0 rounded border-slate-300 text-sky-600 focus:ring-sky-500'
}));
(__VLS_ctx.form.acceptsTerms);
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-sky-500']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(({ class: 'text-sm leading-6 text-slate-600' }));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-600']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(({
	to: '/terms',
	class: 'font-semibold text-sky-600 hover:text-sky-700 hover:underline'
})));
const __VLS_2 = __VLS_1(({
	to: '/terms',
	class: 'font-semibold text-sky-600 hover:text-sky-700 hover:underline'
}), ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-sky-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[handleSubmit, form, form, form, form, form, loading, loading, loading, loading, loading,];
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6(({
	to: '/privacy',
	class: 'font-semibold text-sky-600 hover:text-sky-700 hover:underline'
})));
const __VLS_8 = __VLS_7(({
	to: '/privacy',
	class: 'font-semibold text-sky-600 hover:text-sky-700 hover:underline'
}), ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-sky-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
// @ts-ignore
[];
var __VLS_9;
if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(({
	role: 'alert',
	class: 'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
}));
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-red-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-red-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-700']} */ ;
    (__VLS_ctx.errorMessage);
}
if (__VLS_ctx.successMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(({
	role: 'status',
	class: 'rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'
}));
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-emerald-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-emerald-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-emerald-700']} */ ;
    (__VLS_ctx.successMessage);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(({
	type: 'submit',
	disabled: __VLS_ctx.loading,
	class: 'flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none'
}));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-sky-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sky-600/20']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-sky-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-sky-200']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:shadow-none']} */ ;
(__VLS_ctx.loading ? 'Creando cuenta...' : 'Crear cuenta');
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(({ class: 'text-center text-sm text-slate-600' }));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-600']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12(({
	to: '/login',
	class: 'font-bold text-sky-600 hover:text-sky-700 hover:underline'
})));
const __VLS_14 = __VLS_13(({
	to: '/login',
	class: 'font-bold text-sky-600 hover:text-sky-700 hover:underline'
}), ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-sky-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
// @ts-ignore
[loading, loading, errorMessage, errorMessage, successMessage, successMessage,];
var __VLS_15;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
