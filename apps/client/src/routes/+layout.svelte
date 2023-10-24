<script lang="ts">
  import { Theme, Header, SearchBar } from 'ui/components';
</script>

<Theme>
  <Header>
    <SearchBar slot="gadget" />
  </Header>

  <main
    class="overflow-x-auto p-4"
  >
    <slot />
  </main>
</Theme>
