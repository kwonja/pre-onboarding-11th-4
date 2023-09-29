## 원티드 프론트엔드 4주차 과제

## 프로젝트 소개
한국 임상 정보의 검색 영역을 클론하기 <br/>
검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

## 실행영상
![ezgif com-video-to-gif (2)](https://github.com/kwonja/pre-onboarding-11th-4/assets/42410000/b48caf90-4266-4af3-8ae6-0b812fc66188)
## 프로젝트 기간
23.07.16 ~ 23.07.19

## 실행방법
 ```zsh
 cd pre-onboarding-11th-4
 $ npm install
 $ npm start
 ```
## 요구사항
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
- 검색어가 없을 시 “검색어 없음” 표출
- API 호출별로 로컬 캐싱 구현
  - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
  - expire time을 구현할 경우 가산점
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

## 개발환경
- 언어 : TypeScript
- 라이브러리
  - axios
  - styled-component
  - react-router-dom
## 프로젝트 구조
```
📦 src
├── 📂 apis
├── 📂 component
├── 📂 hook
├── 📂 interface
├── 📂 pages
│    └── 📂 Search
├── 📂 svg
└── 📂 utils
```
## API 호출별로 로컬 캐싱 구현
캐쉬를 구현하기위해 localstorage 사용
검색한 결과에 대해서 만기시간과 함께 스토리지에 저장
스토리지 속 결과에 대해서 만기시간이 지나면 api 호출
```ts
const GetDataFromCache = (key : string) =>{
    const cacheData = localStorage.getItem(key)
    if(cacheData)
    {
        if(JSON.parse(cacheData).expire > Date.now()) return JSON.parse(cacheData)
        else
        {
            localStorage.removeItem(key)
            return null
        }
    }
    else return null
}
export default GetDataFromCache
```
```ts
const GetExpireToken = (datas : Data[]) =>{
    return{
        datas : datas,
        expire : Date.now() + EXPRIE_SECOND
    }
}
```
## 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
디바운스 방법을 사용
함수가 실행된 이후에도 timer 값을 기억해서 timer값이 존재한다면 타이머를 취소해 검색api호출을 없앤다.
```tsx
const DeBounce = (callback: (query: string) => Promise<void>,delay : number) =>{
    let timer : NodeJS.Timeout
        return function (query : string)
        {
            clearTimeout(timer)
            timer = setTimeout( ()=>{
                callback(query)
            },delay)
        }
}
export default DeBounce
```
```tsx
 const OnchangeHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(e.target.value)
        debounceHandler(e.target.value)
    }
    const debounceHandler = useCallback(DeBounce((input) => sendQuery(input), 500),[]);
```
## API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
캐쉬데이터 검사후 try를 통해 캐쉬가 존재하지 않으면 콘솔 출력
```tsx
const sendQuery =async (query : string) => {
    if(query !=="")
    {
        const cachedData = GetDataFromCache(query);
        if(cachedData)
        {
            setDatas(cachedData.datas)
            setnoResult(false)
        }
        else{
            try{
                console.log("api calling")
                const response = await getsearch(query);
                if(response.data.length > 0)
                {
                    const token = GetExpireToken(response.data)
                    localStorage.setItem(query,JSON.stringify(token))
                    setDatas(response.data)
                    setnoResult(false)
                }
                else{
                    setnoResult(true)
                }
            }catch(err){
                console.log(err)
            }
        }
        setisSearched(true)
    }
    else setisSearched(false)
    }
```
## 키보드만으로 추천 검색어들로 이동 가능하도록 구현
```tsx
const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
		const searchLength = datas.length;
		if (e.key === 'ArrowDown') {
			searchLength > 0 && setFocusIdx((prev) => (prev + 1) % searchLength)
		}
		if (e.key === 'ArrowUp') {
			searchLength > 0  && focusIdx === -1 ? 
            setFocusIdx(searchLength-1) :
            setFocusIdx((prev) => (prev - 1 + searchLength) % searchLength)
		}
		if (e.key === 'Escape' || e.key ==='Backspace') {
			setFocusIdx(-1);
		}
		if (e.key === 'Enter') {
			searchLength > 0 && focusIdx >= 0 && setInputValue(datas[focusIdx].sickNm);
		}
	};
```
## API 레파지토리
https://github.com/walking-sunset/assignment-api
