{{-- resources/views/partials/pixel-cat.blade.php --}}
<script src="{{ asset('vendor/pixel-cat/pixel-cat.js') }}" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.PixelCat) window.PixelCat.mountPixelCat({ side: 'right', bottom: 6 });
  });
</script>
