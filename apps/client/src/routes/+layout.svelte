<script>
  import { Theme, Header } from 'ui/components'
</script>

<Theme>
  <Header />
  <main class="h-full overflow-x-auto p-4">
    <slot />
  </main>
</Theme>