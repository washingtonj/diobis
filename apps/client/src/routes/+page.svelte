<script lang="ts">
  import { JobCard, MasonryContainer, MasonryColumn } from 'ui/components';
  import { createMasonry } from 'ui/functions';
  import { screenSize } from 'ui/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  $: columnsByScreenType = {
    ultrawide: 4,
    wide: 3,
    mid: 2,
    small: 1
  }[$screenSize];
</script>

{#await data.payload()}
  <div class="mt-32 flex items-center justify-center">
    <span class="loading loading-spinner text-primary" />
  </div>
{:then response}
  <MasonryContainer>
    {#each createMasonry(response, columnsByScreenType).chuck() as column}
      <MasonryColumn>
        {#each column as job}
          <JobCard
            title={job.title}
            shortDescription={job.description}
            tags={job.tags}
            postedAt={'1h ago'}
            comments={job.quantityOfComments}
            likes={job.quantityOfComments}
          />
        {/each}
      </MasonryColumn>
    {/each}
  </MasonryContainer>
{/await}
