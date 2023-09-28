<script>
  import { goto } from '$app/navigation';
  import { currentUser } from '$lib/pocketbase/auth';
  import { onMount } from 'svelte';

  onMount(() => {
    if (!$currentUser) {
      goto('/login');
    }
  });
</script>
