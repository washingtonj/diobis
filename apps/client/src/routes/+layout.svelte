<script>
  import { Theme, Header, SearchBar } from 'ui/components'
</script>

<Theme>
  <Header>
    <SearchBar slot="gadget" />
  </Header> 
  
  <main class="h-full overflow-x-auto p-4">
    <slot />
  </main>
</Theme>