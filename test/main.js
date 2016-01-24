var test = [
    'test-assert-typedarray-deepequal',
    'test-assert'
];

test.forEach((m_name, idx)=> {
    console.warn(`${idx + 1}  ${m_name}`);
    require(`./${m_name}`);
});