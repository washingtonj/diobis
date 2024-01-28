<script lang="ts">
  import { Theme, HeaderRoot, HeaderLogo, HeaderSettings, HeaderNavbar } from 'ui/components';
</script>

<Theme>
  <HeaderRoot>
    <HeaderLogo slot="logo" />
    <HeaderNavbar slot="navbar" />
    <HeaderSettings slot="settings" />
  </HeaderRoot>

  <main class="overflow-x-auto p-4">
    <slot />
  </main>
</Theme>
