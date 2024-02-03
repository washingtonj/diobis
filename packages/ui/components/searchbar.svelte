<script lang="ts">
  import { SearchOutline, CloseSolid } from 'flowbite-svelte-icons';

  export let searchCriterias = [];
  export let onSearch: (searchCriterias: string[]) => void;

  function handleKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Enter' && target.value !== '') {
      searchCriterias = [...searchCriterias, target.value];
      target.value = '';
      onSearch(searchCriterias);
      return;
    }

    if (event.key === 'Backspace' && target.value === '') {
      searchCriterias.pop();
      searchCriterias = [...searchCriterias];
      onSearch(searchCriterias);
      return;
    }
  }

  function handleRemoveCriteria(index: number) {
    searchCriterias.splice(index, 1);
    searchCriterias = [...searchCriterias];
    onSearch(searchCriterias);
  }
</script>

<div class="flex items-center px-4 mt-4">
  <div class="flex items-center shadow-lg w-full bg-neutral px-4 py-3.5 rounded-md">
    <SearchOutline class=" w-3.5 h-3.5" />

    <span class="mx-3 bg-base-content w-[1px] h-5" />

    <div class="w-full flex gap-1.5">
      {#each searchCriterias as criteria, index}
        <span
          class="min-w-fit flex items-center gap-1.5 badge badge-md text-xs badge-primary capitalize"
          >{criteria}
          <CloseSolid class="w-2 h-2 cursor-pointer" on:click={() => handleRemoveCriteria(index)} />
        </span>
      {/each}

      <input
        class="bg-transparent w-full h-full text-sm text-white outline-none"
        placeholder={searchCriterias.length === 0 ? 'Insert a search criteria and press Enter' : ''}
        on:keydown={handleKeyboardEvent}
      />
    </div>
  </div>
</div>
