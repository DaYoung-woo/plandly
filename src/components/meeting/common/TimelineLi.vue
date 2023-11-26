<template>
	<li class="timeline-item">
		<span class="timeline-item-icon | faded-icon"></span>
		<div class="timeline-item-description">
			<div class="meeting-home-detail">
				<p class="mb-1">타이틀</p>
				<div class="h-14">설명 영역</div>
				<div class="location">
					<div
						class="inline-block h-10 w-10 rounded-full bg-slate-100 text-xs text-center pt-3"
					>
						사용자
					</div>
					<span>작성자 닉네임</span>
					<span>7시간 전 작성</span>
					<span>댓글 몇개</span>
				</div>
			</div>
			<div
				class="bg-slate-200 w-28 h-28 flex items-center justify-center text-sm"
			>
				이미지
			</div>
		</div>
	</li>
</template>

<style scoped lang="scss">
.location {
	span {
		margin-left: 5px;
		height: fit-content;
		padding: 3px;
	}
}
</style>
