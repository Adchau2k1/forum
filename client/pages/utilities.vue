<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const tab = ref(null)

// Chuyển đổi tiền
const amount = ref(null)
const fromCurrency = ref('USD')
const toCurrency = ref('EUR')
const convertedAmount = ref(null)
const currencies = ['USD', 'EUR', 'GBP', 'JPY']
const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.72, JPY: 110.14 },
    EUR: { USD: 1.18, GBP: 0.85, JPY: 129.71 },
    GBP: { USD: 1.39, EUR: 1.17, JPY: 151.91 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066 },
}

const convert = () => {
    const rate = exchangeRates[fromCurrency.value][toCurrency.value]
    convertedAmount.value = (amount.value * rate).toFixed(2)
}
</script>

<template>
    <NuxtLayout>
        <div>
            <h2 class="uppercase">Các tiện ích</h2>
            <div class="mt-8">
                <v-card>
                    <v-tabs v-model="tab" color="#fff" bg-color="#213547">
                        <v-tab value="1" class="!text-12px text-white">Chuyển đổi tiền tệ</v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="1">
                                <div class="mt-4">
                                    <h2>Chuyển đổi tiền tệ</h2>
                                    <v-row class="mt-2">
                                        <v-col cols="12" sm="6">
                                            <v-text-field v-model="amount" type="number" label="Số tiền"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-select v-model="fromCurrency" :items="currencies" label="Từ"></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="-mt-4">
                                            <v-select v-model="toCurrency" :items="currencies" label="Đến"></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="-mt-8 flex items-center justify-between">
                                            <p v-if="convertedAmount !== null" class="text-20px">
                                                Kết quả: {{ convertedAmount }} {{ toCurrency }}
                                            </p>
                                            <p v-else class="text-20px">Kết quả:</p>
                                            <v-btn
                                                @click="convert"
                                                class="!h-50px float-right !text-#fff !font-700 !bg-primary"
                                                >Chuyển đổi</v-btn
                                            >
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-window-item>

                            <!-- <v-window-item value="3" class="py-4">
                                <div class="text-center">Người dùng này chưa có ai theo dõi</div>
                            </v-window-item>
                            <v-window-item value="4" class="py-4">
                                <div class="text-center">Không có gì ở đây cả</div>
                            </v-window-item> -->
                        </v-window>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </NuxtLayout>
</template>
