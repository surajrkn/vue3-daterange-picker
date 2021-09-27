export default {
  mounted (el, binding, vnode) {
    console.log('inserted')
    if (binding.instance.appendToBody) {
      const {height, top, left, width, right} = binding.instance.$refs.toggle.getBoundingClientRect();

      el.unbindPosition = binding.instance.calculatePosition(el, context, {
        width: width,
        top: (window.scrollY + top + height),
        left: (window.scrollX + left),
        right: right
      });

      document.body.appendChild(el);
    } else {
      context.$el.appendChild(el)
    }
  },

  unmounted (el, binding, {context}) {
    if (binding.instance.appendToBody) {
      if (el.unbindPosition && typeof el.unbindPosition === 'function') {
        el.unbindPosition();
      }
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  },
}
