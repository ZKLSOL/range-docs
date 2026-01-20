// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
	output: 'static',
	redirects: {
		'/': '/introduction',
	},
	integrations: [
		starlight({
			plugins: [
				starlightClientMermaid(),
			],
			title: 'Range by Turbine',
			logo: {
				src: './src/assets/logo.png',
				replacesTitle: true,
			},
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			favicon: '/favicon.png',
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'x.com', label: 'X', href: 'https://x.com/turbine_cash' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ZKLSOL/range' },
			],
			components: {
				Header: './src/components/Header.astro',
				Sidebar: './src/components/Sidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
				PageFrame: './src/components/PageFrame.astro',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			sidebar: [
				{ label: 'Introduction', slug: 'introduction' },
				{ label: 'Quick Start', slug: 'quick-start' },
				{
					label: 'Guides',
					items: [
						{ label: 'Client Setup (Codama)', slug: 'guides/codama-setup' },
						{ label: 'KYC/Compliance', slug: 'guides/kyc-compliance' },
						{ label: 'CPI Callbacks', slug: 'guides/cpi-callbacks' },
						{ label: 'Rate Limiting', slug: 'guides/rate-limiting' },
						{ label: 'Custom Messages', slug: 'guides/custom-messages' },
						{ label: 'Testing Locally', slug: 'guides/testing-locally' },
						{ label: 'Build CPI Program', slug: 'guides/build-cpi-program' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Architecture', slug: 'reference/architecture' },
						{ label: 'Settings Account', slug: 'reference/settings-account' },
						{
							label: 'Range Instructions',
							items: [
								{ label: 'initialize_settings', slug: 'reference/instructions/initialize-settings' },
								{ label: 'update_settings', slug: 'reference/instructions/update-settings' },
								{ label: 'transfer_admin', slug: 'reference/instructions/transfer-admin' },
								{ label: 'verify_range', slug: 'reference/instructions/verify-range' },
								{ label: 'verify_range_with_callback', slug: 'reference/instructions/verify-range-with-callback' },
							],
						},
						{
							label: 'CPI Program',
							items: [
								{ label: 'verify_via_range', slug: 'reference/cpi-program/verify-via-range' },
								{ label: 'on_verify', slug: 'reference/cpi-program/on-verify' },
							],
						},
						{ label: 'Events', slug: 'reference/events' },
						{ label: 'Errors', slug: 'reference/errors' },
					],
				},
				{ label: 'Security', slug: 'security' },
				{ label: 'Glossary', slug: 'glossary' },
				{ label: 'FAQ', slug: 'faq' },
			],
		}),
	],
	adapter: cloudflare(),
});
