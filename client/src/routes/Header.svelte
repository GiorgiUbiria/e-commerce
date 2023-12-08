<script lang="ts">
	import { page } from '$app/stores';

	export let user: any;
</script>

<header class="flex items-center justify-between px-4 py-2 bg-gray-900">
	{#if user.userId}
		<a href="/user">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class=" h-8 w-8 text-white"
			>
				<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
			</svg>
			<span class="sr-only">Logo</span>
		</a>
	{/if}
	<nav class="space-x-4">
		{#if !user.authorization}
			<a
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/"
			>
				Home
			</a>
			<a
				aria-current={$page.url.pathname.startsWith('/services') ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/services"
			>
				Services
			</a>
			<a
				aria-current={$page.url.pathname.startsWith('/sign-up') ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/sign-up"
			>
				Sign Up
			</a>
			<a
				aria-current={$page.url.pathname.startsWith('/sign-in') ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/sign-in"
			>
				Sign in
			</a>
		{:else if user.userRole === 'admin' && user.authorization}
			<a
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/"
			>
				Home
			</a>
			<a
				aria-current={$page.url.pathname.startsWith('/services') ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/services"
			>
				Services
			</a>
			<a
				aria-current={$page.url.pathname.startsWith('/users') ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/users"
			>
				Users
			</a>
			<a
				aria-current={$page.url.pathname === '/create_service' ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/create_service"
			>
				Create a Service
			</a>
		{:else if user.userRole !== 'admin' && user.authorization}
			<a
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/"
			>
				Home
			</a>
			<a
				aria-current={$page.url.pathname.startsWith('/services') ? 'page' : undefined}
				class="text-sm font-semibold text-white hover:underline"
				href="/services"
			>
				Services
			</a>
		{/if}
	</nav>
</header>
