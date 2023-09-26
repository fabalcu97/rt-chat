<script lang="ts">
  import { userCollection } from '$lib/pocketbase/auth';
  import Container from '../../components/container.svelte';

  let username = '';
  let email = '';
  let password = '';
  let passwordConfirm = '';

  export async function register() {
    const data = {
      username,
      email,
      emailVisibility: false,
      password,
      passwordConfirm,
    };

    userCollection.create(data);
    userCollection.authWithPassword(email, password);
  }
</script>

<div class="flex h-screen">
  <Container>
    <h2 class="text-center my-5">Welcome!</h2>
    <form on:submit|preventDefault={register} class="h-full flex flex-col p-10">
      <input
        required
        bind:value={username}
        class="mb-5 border-2 rounded-lg pl-5"
        placeholder="Username"
      />
      <input
        required
        bind:value={email}
        class="mb-5 border-2 rounded-lg pl-5"
        placeholder="Email"
      />
      <input
        required
        bind:value={password}
        class="mb-5 border-2 rounded-lg pl-5"
        placeholder="Password"
        type="password"
      />
      <input
        required
        bind:value={passwordConfirm}
        class="mb-5 border-2 rounded-lg pl-5"
        placeholder="Confirm Password"
        type="password"
      />
      <button
        type="submit"
        class="basis-0 rounded-full my-5 py-1 bg-blue-200 hover:bg-blue-300"
        >Register</button
      >
      <a
        href="/login"
        class="basis-0 text-center rounded-full mb-5 py-1 bg-emerald-200 hover:bg-emerald-300"
        >Login</a
      >
    </form>
  </Container>
</div>

<style>
  * {
    /* outline: 1px solid red; */
  }
</style>
