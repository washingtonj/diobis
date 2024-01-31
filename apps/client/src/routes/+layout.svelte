<script lang="ts">
  import { Theme, HeaderRoot, HeaderLogo, HeaderSettings, SearchBar } from 'ui/components';
  import { searchKeys, setSearchKeys } from '$lib/stores/search-criteria';
</script>

<Theme>
  <HeaderRoot>
    <HeaderLogo slot="logo" />
    <HeaderSettings slot="settings" />
    <SearchBar onSearch={setSearchKeys} searchCriterias={$searchKeys} slot="gadget" />
  </HeaderRoot>

  <main class="overflow-x-auto p-4">
    <slot />
  </main>
</Theme>
