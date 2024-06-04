import { useEffect, useState } from 'react';
import Style from './ProductDetail.module.css';

const ProductDetail = ({ onChange }) => {
  const [productName, setProductName] = useState('');
  const [productIntroduction, setProductIntroduction] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    onChange && onChange(formValid);
  }, [formValid]);

  useEffect(() => {
    const isValid =
      productName.trim() !== '' &&
      productIntroduction.trim() !== '' &&
      price.trim() !== '' &&
      tagInput.trim() !== '';

    setFormValid(isValid);
  }, [productName, productIntroduction, price, tags]);

  // input onChange 함수에 넣을 함수
  const handleTagsInputChange = e => {
    setTagInput(e.target.value);
  };

  // input 에서 enter 누르면 tags 배열에 값 추가하기

  const handleTagsInputKeyPress = e => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trimEnd()]);
      setTagInput('');
      e.preventDefault();
    }
  };

  // x 버튼 누르면 생성된 tag div 없애기
  const handleTagDelete = index => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      <div>
        <label>상품명</label>
        <input
          className={Style.product_input}
          type="text"
          placeholder="상품명을 입력해주세요"
          value={productName}
          onChange={e => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label className={Style.product_introduce}>상품 소개</label>
        <textarea
          className={Style.product_textarea}
          placeholder="상품 소개를 입력해주세요"
          value={productIntroduction}
          onChange={e => setProductIntroduction(e.target.value)}
          style={{ height: 200 }}
        />
      </div>
      <div>
        <label>판매가격</label>
        <input
          className={Style.product_input}
          type="text"
          placeholder="판매 가격을 입력해주세요"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>태그</label>
        <input
          className={Style.product_input}
          type="text"
          placeholder="태그를 입력해주세요"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={e => handleTagsInputKeyPress(e)}
        />
      </div>
      <div className={Style.tagDiv}>
        {tags.map((tag, index) => {
          console.log(tag, index);
          return (
            <div
              key={index}
              className={Style.tag}
            >
              {tag}
              <button
                type="button"
                onClick={() => handleTagDelete(index)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductDetail;
