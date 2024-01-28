<script lang="ts">
  import { BarsSolid } from 'flowbite-svelte-icons';
</script>

<header
  class="sticky shadow-xl top-0 w-full backdrop-blur bg-neutral/80 min-h-12 py-4 flex flex-col border-b border-neutral"
>
  <div class="m-auto w-full m-w-xl flex items-center justify-between px-4">
    <div class="flex items-center gap-2">
      <button class="btn btn-sm btn-ghost hover:bg-neutral md:hidden">
        <BarsSolid class="w-3 h-3 text-white" />
      </button>
      <slot name="logo" />
      <slot name="navbar" />
    </div>
    <slot name="settings" />
  </div>

  <slot class="flex items-center px-4 mt-4" name="gadget" />
</header>
