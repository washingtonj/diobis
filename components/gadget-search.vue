<script setup lang="ts">
import { HEADER_GADGET_PORTAL } from "@/consts/globals";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/solid";

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

function onModelValueChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}

function onClear() {
  emit("update:modelValue", "");
}
</script>

<template>
  <client-only>
    <teleport :to="`#${HEADER_GADGET_PORTAL}`">
      <div>
        <div
          class="flex w-full rounded-md p-2.5 bg-slate-500/10 dark:bg-slate-400/10"
        >
          <span
            class="flex items-center cursor-pointer mr-2 pr-2 border-r-[1px] border-slate-500/20 dark:border-slate-400/20"
            aria-label="search"
          >
            <magnifying-glass-icon
              class="h-4 text-slate-600 dark:text-slate-400"
            />
          </span>
          <input
            class="w-full bg-transparent rouded-md text-sm outline-none dark:text-white dark:placeholder:text-slate-400 placeholder:text-slate-600"
            type="text"
            placeholder="Pesquisar por palava-chave"
            :value="props.modelValue"
            @change="onModelValueChange"
          />
          <span
            aria-label="clear"
            class="cursor-pointer flex items-center w-4"
            @click="onClear"
            v-if="props.modelValue"
          >
            <x-mark-icon class="w-full text-slate-600 dark:text-slate-400" />
          </span>
        </div>
      </div>
    </teleport>
  </client-only>
</template>
