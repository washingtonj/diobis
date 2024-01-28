<script lang="ts">
  export let title: string;
  export let shortDescription: string;
  export let tags: string[];
  export let postedAt: string;
  export let comments: number;
  export let likes: number;
  export let source: string;
  export let avatar: string;
  export let sourceUrl: string;
</script>

<a href={sourceUrl} class="cursor-pointer flex items-center h-max gap-6 p-6 rounded-md bg-neutral">
  <div class="flex flex-col text-white">
    <div class="flex items-center gap-4 mb-4">
      <img src={avatar} alt="User Avatar" class="w-6 h-6 rounded-full" />
      <h3 class="text-xs uppercase">
        {source}
      </h3>
    </div>

    <span>
      <h2 class="font-bold text-lg">{title}</h2>
      <p class="text-xs">{shortDescription}</p>
    </span>

    <ul class="flex flex-wrap gap-0.5 gap-y-1 mt-3">
      {#each tags as tag}
        <li class="text-xs badge text-white">{tag}</li>
      {/each}
    </ul>

    <div class="flex gap-4 mt-2">
      <span>
        <span class="text-xs text-base-content">Posted</span>
        <span class="text-xs font-bold">{postedAt}</span>
      </span>

      <span>
        <span class="text-xs text-base-content">Comments</span>
        <span class="text-xs font-bold">{comments}</span>
      </span>

      <span>
        <span class="text-xs text-base-content">Likes</span>
        <span class="text-xs font-bold">{likes}</span>
      </span>
    </div>
  </div>
</a>
