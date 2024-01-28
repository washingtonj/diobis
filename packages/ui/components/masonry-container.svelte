<script context="module" lang="ts">
  import { createMasonry } from '../functions/masonry-order';
</script>

<div
  data-testid="masonry-container"
  class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3"
>
  <slot />
</div>
