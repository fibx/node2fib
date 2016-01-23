var test = [
    'test-assert'
];

test.forEach(m_name=> {
    require(`./${m_name}`);
});