import { computed } from 'vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_serviceWorkerUrl, registration) {
        if (!registration) {
            return;
        }
        window.setInterval(() => {
            void registration.update();
        }, 60 * 60 * 1000);
    },
    onRegisterError(error) {
        console.error('No se pudo registrar el Service Worker:', error);
    },
});
const visible = computed(() => offlineReady.value || needRefresh.value);
const title = computed(() => {
    if (needRefresh.value) {
        return 'Nueva versión disponible';
    }
    return 'SYNER está lista para funcionar sin conexión';
});
const description = computed(() => {
    if (needRefresh.value) {
        return 'Actualizá la aplicación para utilizar la versión más reciente.';
    }
    return 'Los recursos principales quedaron guardados en este dispositivo.';
});
async function updateApplication() {
    await updateServiceWorker(true);
}
function dismiss() {
    offlineReady.value = false;
    needRefresh.value = false;
}
const __VLS_ctx = ({ ...{} });
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    enterActiveClass: "transition duration-200 ease-out",
    enterFromClass: "translate-y-4 opacity-0",
    enterToClass: "translate-y-0 opacity-100",
    leaveActiveClass: "transition duration-150 ease-in",
    leaveFromClass: "translate-y-0 opacity-100",
    leaveToClass: "translate-y-4 opacity-0",
}));
const __VLS_2 = __VLS_1({
    enterActiveClass: "transition duration-200 ease-out",
    enterFromClass: "translate-y-4 opacity-0",
    enterToClass: "translate-y-0 opacity-100",
    leaveActiveClass: "transition duration-150 ease-in",
    leaveFromClass: "translate-y-0 opacity-100",
    leaveToClass: "translate-y-4 opacity-0",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.visible) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)(({
	role: 'status',
	'aria-live': 'polite',
	class: 'fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/15 sm:right-6 sm:bottom-6 sm:left-auto sm:w-full'
}));
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['bottom-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-slate-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-slate-900/15']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:right-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:bottom-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:left-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:w-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(({ class: 'flex items-start gap-3' }));
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(({
	class: 'flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-600',
	'aria-hidden': 'true'
}));
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['size-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-sky-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sky-600']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(({ class: 'min-w-0 flex-1' }));
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(({ class: 'font-bold text-slate-900' }));
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-900']} */ ;
    (__VLS_ctx.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(({ class: 'mt-1 text-sm leading-5 text-slate-500' }));
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
    (__VLS_ctx.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(({ class: 'mt-4 flex flex-wrap gap-2' }));
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    if (__VLS_ctx.needRefresh) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(({
	onClick: __VLS_ctx.updateApplication,
	type: 'button',
	...{ class: 'rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200' }
}));
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-sky-600']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-sky-700']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus-visible:outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus-visible:ring-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus-visible:ring-sky-200']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(({
	onClick: __VLS_ctx.dismiss,
	type: 'button',
	...{ class: 'rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50' }
}));
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-slate-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-600']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-slate-50']} */ ;
    (__VLS_ctx.needRefresh ? 'Más tarde' : 'Entendido');
}
// @ts-ignore
[visible, title, description, needRefresh, needRefresh, updateApplication, dismiss,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
