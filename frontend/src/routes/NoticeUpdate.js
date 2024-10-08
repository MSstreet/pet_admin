/* NoticeUpdate.js */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const NoticeUpdate = () => {
    const navigate = useNavigate();
    const {noticeIdx} = useParams(); // /update/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [notice, setNotice] = useState({
        noticeIdx: 0,
        title: '',
        createdBy: '',
        contents: '',
    });

    const {title, createdBy, contents} = notice; //비구조화 할당

    const onChange = (event) => {
        const {value, name} = event.target; //event.target에서 name과 value만 가져오기
        setNotice({
            ...notice,
            [name]: value,
        });
    };

    const getNotice = async () => {
        const resp = await (await axios.get(`//localhost:8082/notice/${noticeIdx}`)).data;
        setNotice(resp.data);
    };

    const updateNotice = async () => {
        await axios.patch(`//localhost:8082/notice/update`, notice).then((res) => {
            alert('수정되었습니다.');
            navigate('/notice/' + noticeIdx);
        });
    };

    const backToDetail = () => {
        navigate('/notice/' + noticeIdx);
    };

    useEffect(() => {
        getNotice();
    }, []);

    return (
        <div>
            <div>
                <span>제목</span>
                <input type="text" name="title" value={title} onChange={onChange}/>
            </div>
            <br/>
            <div>
                <span>작성자</span>
                <input type="text" name="createdBy" value={createdBy} readOnly={true}/>
            </div>
            <br/>
            <div>
                <span>내용</span>
                <textarea
                    name="contents"
                    cols="30"
                    rows="10"
                    value={contents}
                    onChange={onChange}
                ></textarea>
            </div>
            <br/>
            <div>
                <button onClick={updateNotice}>수정</button>
                <button onClick={backToDetail}>취소</button>
            </div>
        </div>
    );
};

export default NoticeUpdate;