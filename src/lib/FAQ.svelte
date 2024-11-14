<script lang="ts">
  export let title = "";
  export let faq;
</script>

{#each Object.entries(faq) as [key, value]}
  <div
    class="col-span-2 mx-auto flex w-full flex-col items-start justify-start pr-2 sm:col-span-1"
  >
    <p class="sticky top-16 text-2xl font-light sm:text-3xl md:text-4xl">
      {value[0].replaceAll("_", " ")}
    </p>
  </div>
  <div
    class="col-span-3 mx-auto flex h-full w-[90%] flex-col items-start justify-start sm:col-span-1"
  >
    <div class="mx-auto flex w-full flex-col divide-y-[1px] divide-gray-300">
      {#each value[1] as f}
        <div class="my-2 h-fit w-full max-w-xl">
          <button
            on:click={() => {
              f[2] = !f[2];
            }}
            class="flex w-full items-start justify-between"
          >
            <p
              class="w-fit text-start text-xl font-light text-gray-500 sm:text-2xl md:text-3xl"
            >
              {f[0]}
            </p>
            <div class="relative mt-1 h-8 w-8">
              <svg
                viewBox="0 0 24 24"
                class:rotate-45={f[2] === true}
                class="stroke-gray-500 transition-all duration-100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g><g id="SVGRepo_iconCarrier">
                  <path
                    d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g></svg
              >
            </div>
          </button>
          <p
            class:hidden={f[2] === false}
            class="overflow-clip text-start text-sm font-light sm:text-base md:text-lg"
          >
            {f[1]}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/each}
