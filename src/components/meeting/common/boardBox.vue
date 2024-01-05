<template>
	<div class="mt-5 p-5 border notice-box">
		<div class="flex justify-between">
			<div>
				<h4 class="text-xl text-left">공지 타이틀</h4>
				<div class="desc text-left">
					공지의 내용. 공지가 아니라도 메모로 남기고 싶은 것들을 남길 수 있음.
				</div>
			</div>
			<div class="bg-slate-200 w-32 flex items-center justify-center">사진</div>
		</div>
		<div class="detail">
			<div
				class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-200 bg-slate-200 flex items-center text-center mr-2"
			>
				작성자
			</div>
			<span class="bg-slate-200 flex items-center px-2 mr-2"
				>작성자 닉네임</span
			>
			<span class="bg-slate-200 flex items-center px-2 mr-2">7시간 전</span>
			<span class="bg-slate-200 flex items-center px-2">댓글 20개</span>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style></style>
