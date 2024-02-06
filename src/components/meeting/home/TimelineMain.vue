<template>
  <h5 class="pt-10 text-2xl text-left">타임라인</h5>
  <hr class="mt-1" />

  <p class="pt-5 text-xl text-left pb-4">1일차</p>
  <div class="timeline-box">
    <ol class="timeline">
      <li class="timeline-item">
        <span class="timeline-item-icon | faded-icon"></span>
        <div class="timeline-item-description">
          <div class="meeting-home-detail">
            <p class="mb-1">타이틀</p>
            <div class="h-14">설명 영역</div>
            <div class="location">
              <span class="flex">
                <IconLocation class="w-2 h-4" />
                강남구 강남대로 84길 6 1층
              </span>
              <a href="#">구글 지도로 바로가기</a>
            </div>
          </div>
          <div class="bg-slate-200 w-28 h-28 flex items-center justify-center text-sm">이미지</div>
        </div>
      </li>

      <li class="timeline-item">
        <span class="timeline-item-icon | faded-icon"></span>
        <div class="timeline-item-description">
          <div class="meeting-home-detail">
            <p class="mb-1">타이틀</p>
            <div class="h-14">설명 영역</div>
            <div class="location">
              <span class="flex">
                <IconLocation class="w-2 h-4" />
                강남구 강남대로 84길 6 1층
              </span>
              <a href="#">구글 지도로 바로가기</a>
            </div>
          </div>
          <div class="bg-slate-200 w-28 h-28 flex items-center justify-center text-sm">이미지</div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import IconLocation from '@/assets/img/common/icon_location.svg'
</script>

<style lang="scss">
.timeline {
  width: 100%;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding: 0px 0 32px 32px;
  border-left: 0.5px solid #ddd;
  font-size: 1.125rem;
}

.timeline-item {
  display: flex;
  gap: 24px;
  & + * {
    margin-top: 32px;
  }
  & + .extra-space {
    margin-top: 48px;
  }
}

.timeline-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: -37px;
  flex-shrink: 0;
  overflow: hidden;

  &.faded-icon {
    background-color: #eee;
  }
}

.timeline-item-description {
  display: flex;
  margin-top: -6px;
  gap: 8px;
  color: #000;
  width: 100%;
  justify-content: space-between;
  text-align: left;
  font-size: 12px;
  p {
    font-size: 16px;
    line-height: normal;
    margin-bottom: 5px;
    margin-bottom: 10px;
  }
}
</style>
