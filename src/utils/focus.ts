// Moves keyboard focus to the first invalid field once the error messages
// have been rendered. Pass the form id to look only inside that form.
export function focusFirstInvalid(formId?: string): void {
  window.requestAnimationFrame(() => {
    const scope = (formId ? document.getElementById(formId) : null) ?? document;
    const field = scope.querySelector<HTMLElement>('[aria-invalid="true"]');
    field?.focus();
  });
}