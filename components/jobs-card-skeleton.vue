<template>
  <div
    data-testid="JobsCardSkeleton"
    class="inline-block w-full rounded-md p-4 bg-blue-50 dark:bg-slate-800"
  >
    <div class="animate-pulse">
      <div class="flex items-center">
        <div
          class="w-12 h-12 mr-4 rounded-full bg-blue-100 dark:bg-slate-600"
        />
        <div>
          <div class="w-52 h-3 mb-2 rounded-md bg-blue-100 dark:bg-slate-600" />
          <div class="w-40 h-3 rounded-md bg-blue-100 dark:bg-slate-600" />
        </div>
      </div>
      <div class="my-4">
        <div class="w-full h-5 rounded-md bg-blue-100 dark:bg-slate-600 mb-2" />
        <div class="w-1/2 h-5 rounded-md bg-blue-100 dark:bg-slate-600" />
      </div>
      <div class="w-full h-10 rounded-md bg-blue-100 dark:bg-slate-600" />
    </div>
  </div>
</template>
