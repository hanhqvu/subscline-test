<script lang="ts">
    import Counter from "./Counter.svelte";

    let counters: Array<{id: string}> = [ {id: '1'} ];

    function addCounter() {
        counters = [...counters, { id: String(counters.length + 1) }]
    }

    function removeCounterWithId(id: string) {
        counters = counters.filter(el => el.id !== id);
    }
</script>


<div>
    <ul>
    {#each counters as counter (counter.id)}
        <li>
            <Counter />
            <button on:click={() => removeCounterWithId(counter.id)}>Remove</button>
        </li>
    {/each}
    </ul>
    <button on:click={addCounter}>Add Counter</button>
</div>