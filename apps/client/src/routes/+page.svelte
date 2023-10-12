<script lang="ts">
  import { JobCard, Masonry, MasonryColumn, createMasonry } from 'ui/components';
  import { screenType } from 'ui/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  const columnsByScreenType = {
    desktop: 3,
    tablet: 2,
    mobile: 1
  }[$screenType];
</script>

{#await data.payload()}
  <div class="flex items-center justify-center">
    <span class="loading loading-spinner text-accent" />
  </div>
{:then response}
  <Masonry>
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
  </Masonry>
{/await}
