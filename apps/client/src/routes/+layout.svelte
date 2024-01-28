<script lang="ts">
  import { Theme, HeaderRoot, HeaderLogo, HeaderSettings } from 'ui/components';
</script>

<Theme>
  <HeaderRoot>
    <HeaderLogo slot="logo" />
    <HeaderSettings slot="settings" />
  </HeaderRoot>

  <main class="overflow-x-auto p-4">
    <slot />
  </main>
</Theme>
