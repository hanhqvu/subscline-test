<script lang="ts">
  export let title: string;
  export let count: number;
  let editing = false;
  let titleInput: HTMLInputElement;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      titleInput.blur();
    }
  }

  function toggleEdit() {
    editing = !editing;
  }

  function increment() {
    count += 1;
  }

  function decrement() {
    if (count === 0) return;
    count -= 1;
  }

  function reset() {
    count = 0;
  }
</script>

<div
  class="my-2 lg:m-5 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-4x dark:border-gray-700 dark:bg-gray-800 p-2"
>
  <div>
    {#if editing}
      <input
        bind:this={titleInput}
        bind:value={title}
        type="text"
        placeholder="Title"
        on:blur={toggleEdit}
        on:keydown={handleKeyDown}
      />
    {:else}
      <span>{title ? title : 'Click edit to add title'}</span>
    {/if}
    <button on:click={toggleEdit}>
      {#if editing}
        Cancel
      {:else}
        Edit
      {/if}
    </button>
    <slot />
  </div>
  <div class="p-2">
    <span>Count is {count}</span>
    <button on:click={increment}> Increment </button>
    <button on:click={decrement}> Decrement </button>
    <button on:click={reset}> Reset </button>
  </div>
</div>
