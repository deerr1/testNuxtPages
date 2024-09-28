export default defineEventHandler(async (event) => {
    const imageName = getRouterParam(event, 'imageName')
    const data = await useStorage('files').getItemRaw(`images:${imageName}`)
    // const data = await useStorage('files').getItem('data.json')
    // console.log(data['hello'])
    return data
})