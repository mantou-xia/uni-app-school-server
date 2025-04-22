<template>
    <view class="my-container">
      	<UserCard/>
		<FunctionSection/>
        <OrderSection/>
       <BottomSection/>
        <ren-customer-navigator></ren-customer-navigator>
    </view>
</template>

<script >
	import BottomSection from '@/components/my/BottomSection/BottomSection.vue';
	import FunctionSection from '@/components/my/FunctionSection/FunctionSection.vue';
	import OrderSection from '@/components/my/OrderSection/OrderSection.vue';
	import UserCard from '@/components/my/UserCard/UserCard.vue';
// const navigateTo = (url) => {
//     uni.navigateTo({
//         url: url
//     });
// }
export default {
		data() {
			return {
			}
		},
		components: {
			BottomSection,
			FunctionSection,
			OrderSection,
			UserCard
		},
		methods: {
			
		}
	}
</script>

<style>
.my-container {
    min-height: 100vh;
    background-color: #f5f5f5;
}

</style>