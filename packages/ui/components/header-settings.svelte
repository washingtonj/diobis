<script lang="ts">
  import { PalleteSolid, TextSizeOutline, UserSolid } from 'flowbite-svelte-icons';
  import { nextTheme } from 'ui/stores/theme';
  import { nextFontSize } from 'ui/stores/screen';
</script>

<div>
  <button tabindex="0" class="btn btn-sm btn-ghost hover:bg-neutral" on:click={nextTheme}>
    <PalleteSolid class="w-3 h-3 text-white" />
  </button>
  <button class="btn btn-sm btn-ghost hover:bg-neutral" on:click={nextFontSize}>
    <TextSizeOutline class="w-3 h-3 text-white" />
  </button>
</div>
