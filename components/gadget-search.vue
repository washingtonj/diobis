<script setup lang="ts">
import { HEADER_GADGET_PORTAL } from "@/consts/globals";

interface Props {
  modelValue: string;
  // checkeds: Array<string>;
  // repositories: Array<{ id: string; title: string; description: string }>;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue", "filter"]);

// const checkeds = ref(props.checkeds);

// const openModal = ref(false);

// const buttonText = computed(() =>
//   checkeds.value.length > 1 ? `${checkeds.value.length} fontes` : "1 fonte"
// );

// const isLastItem = computed((value) => checkeds.value.length === 1);

function onModelValueChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}

// function handleChecked(id: string) {
//   const isChecked = checkeds.value.findIndex((item) => item === id);

//   if (isChecked === -1) {
//     checkeds.value = [...checkeds.value, id];
//     return;
//   }

//   if (isLastItem.value) return;
//   checkeds.value = checkeds.value.filter((item) => item !== id);
// }

// watch(openModal, (isOpened) => {
//   if (!isOpened) {
//     emit("filter", checkeds.value);
//   }
// });
</script>

<template>
  <client-only>
    <teleport :to="`#${HEADER_GADGET_PORTAL}`">
      <div>
        <div
          class="flex w-full rounded-md p-2.5 bg-slate-500/10 dark:bg-slate-400/10"
        >
          <input
            class="w-full bg-transparent rouded-md text-sm outline-none dark:text-white dark:placeholder:text-slate-400 placeholder:text-slate-600"
            type="text"
            placeholder="Pesquisar por palava-chave"
            :value="props.modelValue"
            @change="onModelValueChange"
          />
          <!-- <div
            class="relative w-28 px-2 text-center rounded-md text-sm bg-slate-200 dark:bg-slate-700"
          >
            <button
              class="font-semibold uppercase text-xs text-slate-800 dark:text-slate-100"
              @click="openModal = true"
            >
              {{ buttonText }}
            </button>
          </div> -->
        </div>
      </div>
    </teleport>
    <!-- <layout-modal-root v-if="openModal" @close="openModal = false">
      <div>
        <div class="px-4">
          <ul class="flex flex-wrap items-center gap-10">
            <li v-for="repo in props.repositories" :key="repo.id">
              <span
                class="flex items-center cursor-pointer"
                @click="() => handleChecked(repo.id)"
              >
                <input
                  class="mr-2"
                  type="checkbox"
                  :checked="checkeds.includes(repo.id)"
                  :disabled="checkeds.includes(repo.id) && isLastItem"
                />
                <h3 class="text-sm uppercase font-bold">{{ repo.title }}</h3>
              </span>
              <span class="text-xs">
                <p>{{ repo.description }}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </layout-modal-root> -->
  </client-only>
</template>
