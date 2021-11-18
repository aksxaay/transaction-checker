const block = {
  value: undefined,
  to: '0xblah'
}

if (block.value == undefined) { block.value = 'undefined'}
console.log(`${block.value.toString()}`)