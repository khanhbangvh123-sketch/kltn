# Khảo sát nguồn ngữ liệu tiếng Êđê và dataset song ngữ Anh–Êđê

**Ngày lập:** 10/09/2026  
**Đối tượng ngôn ngữ:** tiếng Êđê (Rhade / Rade / klei Êđê)  
**Mã ISO 639-3:** `rad`  
**Glottocode:** `rade1240`  
**Phạm vi:** internet, kho NLP, sách báo, từ điển, kho lưu trữ ngôn ngữ học, phát thanh–truyền hình, Kinh Thánh, audio hiện trường

---

## Kết luận chính

Trên toàn thế giới hiện **không có corpus song ngữ câu tiếng Anh–tiếng Êđê** sẵn dùng trên Hugging Face, OPUS, NLLB hay FLORES.

Tài nguyên máy tính công bố chủ yếu là **Êđê–Việt**. Cặp **Anh–Êđê** tồn tại ở mức:

- từ điển và danh sách từ (chất lượng cao);
- giáo trình SIL ba ngữ;
- Kinh Thánh có thể **tự căn chỉnh theo số câu** (bản quyền hạn chế).

---

## 0. Định danh ngôn ngữ — tránh nhầm lẫn

| Trường | Giá trị |
|---|---|
| Tên tự gọi | klei Êđê |
| Tên tiếng Việt | tiếng Êđê / Ê Đê / E-De |
| Tên quốc tế thường gặp | Rade, Rhade, Raday, Rde |
| ISO 639-3 | `rad` |
| Glottocode (ngôn ngữ) | `rade1240` |
| Glottocode (nhóm Rade–Jarai) | `rade1241` — **không** dùng thay cho ngôn ngữ |
| Bih (có thể tách thành ngôn ngữ riêng) | ISO `ibh`, glottocode `biha1246` |
| Ngữ hệ | Austronesian → Malayo-Polynesian → Chamic → Highlands |
| Địa bàn chính | Đắk Lắk, một phần Gia Lai, Phú Yên; có cộng đồng ở Campuchia và Hoa Kỳ |
| Chữ viết | Latinh (Quốc ngữ biến đổi), có ký tự đặc trưng: ƀ, đ, ñ, ă, ê, ô, ư, ơ… |

**Cảnh báo tra cứu:** nhiều dataset Hugging Face mang tên *Edo* hoặc *Ewe* **không phải** tiếng Êđê.

| Tên dễ nhầm | Mã | Khu vực | Không dùng cho Êđê |
|---|---|---|---|
| Edo | `bin` | Nigeria | `michsethowusu/english-edo_sentence-pairs_mt560` |
| Ewe | `ewe` | Ghana / Togo | `Ghana-NLP/EWE_ENGLISH_PARALLEL_TEXT` |

**Phương ngữ Êđê** (Đoàn Văn Phúc 1998): Kpă, Krung, Adham, Ktul, Drao (Kơdrao), Blô, Êpan, Mdhur, Bih. Corpus NLP hiện nay hầu hết theo phương ngữ **Kpă / chuẩn Buôn Ma Thuột**.

---

## 1. Dataset số hóa (NLP) — tải được ngay

### 1.1. Corpus song ngữ Êđê–Việt (tốt nhất hiện nay)

**Tên:** `NIRVLab/rhade-vietnamese-mt`  
**Liên kết:** https://huggingface.co/datasets/NIRVLab/rhade-vietnamese-mt  
**Cặp:** Êđê (`ede`) → Việt (`vi`)  
**Quy mô:** 17.097 cặp câu  
**Định dạng:** Parquet / JSON (`translation.ede`, `translation.vi`)  
**Dung lượng:** ~1,63 MB  
**Miền:** tôn giáo, văn xuôi chung, báo chí  
**Nguồn gốc đã công bố:**

| Nguồn | Mô tả | URL |
|---|---|---|
| VOV4 | Đài Tiếng nói Việt Nam, chuyên mục Êđê | https://vov4.vov.vn/ede |
| Kinh Thánh RVV11 | Corpus song ngữ Êđê–Việt | https://kinhthanh.httlvn.org/?v=RVV11 |
| HDOK / YPHIC | Dữ liệu Rhade thu thập độc lập | https://huggingface.co/YPHIC |

**Hạn chế:** lệch miền tôn giáo và phát thanh; tokenization / hình thái Êđê chưa có công cụ chuẩn.

**Trích dẫn gợi ý:**

```
Tran, Nhan D. (2025). Rhade–Vietnamese Machine Translation Dataset.
Hugging Face. https://huggingface.co/datasets/NIRVLab/rhade-vietnamese-mt
```

### 1.2. Corpus thô quy mô lớn (cần lọc)

**Tên:** `HeyDunaX/rhade-vi-delete-original`  
**Liên kết:** https://huggingface.co/datasets/HeyDunaX/rhade-vi-delete-original  
**Cặp:** Êđê–Việt  
**Quy mô:** khoảng 210.000 dòng (train ~208k, validation 1k, test 1k)

Quan sát mẫu: lẫn mục từ điển ngắn (`Ƀuôn` / `Buôn`), câu Kinh Thánh dài, và cụm như `Dua klei blu` / `Song ngữ`. **Không nên dùng thô** cho huấn luyện; cần khử trùng, lọc độ dài, loại nhiễu.

### 1.3. Benchmark truy hồi thông tin (không phải bản dịch người)

**Tên:** `NIRVLab/EViRAL`  
**Liên kết:** https://huggingface.co/datasets/NIRVLab/EViRAL  
**Nhiệm vụ:** truy vấn tiếng Êđê → đoạn văn tiếng Việt (cross-lingual IR)  
**Nguồn truy vấn gốc:** WebFAQ tiếng Việt (`PaDaS-Lab/webfaq-retrieval`)  
**Cách tạo phía Êđê:** dịch máy bằng mô hình `NIRVLab/ViEde` (mBART), BLEU ~22,8; ChrF++ ~46,2  
**Lưu ý khoa học:** đây **không phải gold translation**. Không dùng làm corpus song ngữ Anh–Êđê hay Êđê–Việt chuẩn.

Mô hình liên quan trên Hugging Face:

- https://huggingface.co/NIRVLab/ede-xlm-roberta-base
- https://huggingface.co/NIRVLab/transformer_morpheme_eviral_v4
- https://huggingface.co/NIRVLab/splade_unigram
- https://huggingface.co/NIRVLab/ViEde

### 1.4. Mô hình / API (không phải dataset công bố rõ)

| Tài nguyên | Liên kết | Ghi chú |
|---|---|---|
| HDOK / YPHIC | https://huggingface.co/YPHIC | Hồ sơ thu thập dữ liệu Rhade |
| `rhade_ttt_model_v01` | https://huggingface.co/YPHIC/rhade_ttt_model_v01 | Mô hình ngôn ngữ Rhade |
| Rhade AI API | https://huggingface.co/spaces/YPHIC/rhade-ai-api | Dịch / sinh văn bản Rhade |

### 1.5. Những kho lớn **không** chứa tiếng Êđê

| Kho | Tình trạng với `rad` |
|---|---|
| NLLB-200 | Không có |
| FLORES-200 | Không có |
| OPUS (cặp `rad–en`) | Không có tập riêng |
| Common Voice | Không có |
| Wikipedia tiếng Êđê | Không đủ để làm corpus |

---

## 2. Nguồn Anh–Êđê thật (vàng cho từ vựng)

Đây là tầng **song ngữ Anh** đáng tin nhất hiện nay. Chưa phải corpus câu song song kiểu MT, nhưng là nền tảng lexicon / wordlist.

### 2.1. Từ điển chuẩn (ưu tiên số 1)

**Tharp, James A. & Y-Bhăm Đuôn-yă (1980).**  
*A Rhade–English Dictionary with English–Rhade Finderlist.*  
Pacific Linguistics, Series C, No. 58. The Australian National University.

| Thuộc tính | Chi tiết |
|---|---|
| Giấy phép | **CC BY-SA 4.0** (bản trực tuyến 2015) |
| PDF SEAlang | http://sealang.net/archives/pl/pdf/PL-C58.pdf |
| DOI | https://doi.org/10.15144/pl-c58 |
| Internet Archive | https://archive.org/details/rhadeenglishdict0000thar |
| Endangered Languages Project | https://endangeredlanguages.com/resource/rhade-english-dictionary-english-rhade-finderlist |
| Nội dung | mục từ Êđê → Anh, finderlist Anh → Êđê, loại từ, từ nguyên Proto-Austronesian / Proto-Chamic, câu ví dụ |

Đây là nguồn **tốt nhất** để OCR / parse thành file TSV `ede \t en \t pos \t example`.

### 2.2. Từ vựng SIL ba ngữ (1979)

**Y-Chang Niê Siêng (1979).** *Klei hriăm boh blŭ Êđê = Ngữ-vựng Êđê = Rade Vocabulary.*  
Summer Institute of Linguistics. Khoảng 345 trang. **Êđê – Việt – Anh.**

- SIL: https://www.sil.org/resources/archives/30993
- Internet Archive / Rosetta Project: https://archive.org/details/rosettaproject_rad_morsyn-1
- OLAC: http://olac.ldc.upenn.edu/item/oai:sil.org:30993

### 2.3. Giáo trình SIL ba ngữ

**Y-Chang Niê Siêng & Kenneth Swain.**  
*Hriâm klei Êdê = Bài học tiếng Êdê = Rade language lessons.*

- PDF: https://www.sil.org/resources/archives/30996  
  (file: `Rade_Language_Lessons.pdf`)
- Ngôn ngữ nội dung: English + Rade + Vietnamese
- Dạng: bài học, từ vựng, mẫu câu — rất phù hợp làm seed corpus sư phạm

### 2.4. Danh sách từ SIL 281 mục (1972)

**Y-Son-Nie (biên soạn), 18/12/1972.** *Vietnam word list (revised): Rađê.*  
281 mục từ. Anh – Êđê – Việt.

- https://www.sil.org/resources/archives/43372
- File: `Viet_Word_List_Rade.pdf`

### 2.5. ABVD — từ vựng cơ bản Austronesian

**Austronesian Basic Vocabulary Database — Rhade**  
247 mục, nhập từ Tharp 1980.

- https://lpan.eva.mpg.de/austronesian/language.php?id=741
- ISO: `rad` · Glottocode: `rade1240`
- Giấy phép ABVD: CC BY 4.0 (xem trang dự án)

### 2.6. Siêu dữ liệu ngôn ngữ học (không phải văn bản dài)

| Kho | Liên kết | Dùng để làm gì |
|---|---|---|
| Glottolog — Rade | https://glottolog.org/resource/languoid/id/rade1240 | thư mục công trình |
| WALS — Rade | https://wals.info/languoid/lect/wals_code_rad | đặc trưng loại hình |
| OLAC — `rad` | http://olac.ldc.upenn.edu/language/rad | catalog tài nguyên |
| Wikipedia EN | https://en.wikipedia.org/wiki/Rade_language | tổng quan, phương ngữ |
| Wikipedia VI | https://vi.wikipedia.org/wiki/Tiếng_Ê_Đê | tổng quan tiếng Việt |
| Ethnologue | https://www.ethnologue.com/language/rad | nhân khẩu ngôn ngữ |
| Omniglot | trang chữ viết Rade (dẫn từ Wikipedia) | chính tả |
| PHOIBLE / ASJP / CLDF | tra theo glottocode `rade1240` | kho âm vị / 40 từ Swadesh |

---

## 3. Cách dựng corpus Anh–Êđê lớn nhất: căn chỉnh Kinh Thánh

Đây là **nguồn song ngữ câu Anh–Êđê** lớn nhất trên thực tế. **Không phải dataset mở sẵn**; phải tự căn theo ID câu và tôn trọng bản quyền UBS / Hội Thánh Kinh.

### 3.1. Bản Êđê

| Bản | Năm | Ghi chú | Liên kết |
|---|---|---|---|
| *Klei Aê Diê Blŭ* (RAD2015) | 2015 | Kinh Thánh trọn bộ, United Bible Societies | https://www.bible.com/languages/rad |
| Scripture Earth — Rade | — | đọc / nghe / xem trên Bible.is | https://www.scriptureearth.org/00eng.php?iso=rad |
| *Klei Mphŭn Dŏng* (Sáng thế) | 1968 | Rosetta Project | oai:rosettaproject.org:rosettaproject_rad_gen-1 |
| App Android RADB | 2015/2016 | SIL + UBS; trích dẫn tối đa 1.000 câu theo điều khoản | tìm trên Google Play: *KLEI AÊ DIÊ BLŬ* |

Lịch sử dịch thuật (Joshua Project):

- Đoạn Kinh Thánh: 1937–1966
- Tân Ước: 1964
- Kinh Thánh trọn bộ: 1997–2015

### 3.2. Bản để căn song ngữ

| Bản đích | Ngôn ngữ | Gợi ý dùng |
|---|---|---|
| RVV11 và các bản HTTLVN | Việt | đã được NIRVLab dùng cho cặp Êđê–Việt |
| World English Bible (WEB) | Anh | công cộng hơn; phù hợp nghiên cứu |
| ESV / NIV / KJV | Anh | phổ biến, bản quyền chặt |

**Quy trình:** căn theo số chương–câu (`Gen 1:1` ↔ cùng ID) → khoảng **30.000 cặp verse** Anh–Êđê.  
Phải xin phép nếu **phân phối lại** toàn văn.

### 3.3. Audio / video tôn giáo (có kênh Anh)

| Nguồn | Liên kết |
|---|---|
| Joshua Project — Rade | https://joshuaproject.net/languages/rad |
| Global Recordings Network — Rade | https://globalrecordings.net/en/language/rad |
| Jesus Film Project — Rade | tra ISO `rad` trên jesusfilm.org / Scripture Earth |
| Faith Comes By Hearing / Bible.is | dẫn từ Scripture Earth |
| YouVersion iOS/Android: Rade | app Bible, ngôn ngữ `rad` |

---

## 4. Văn bản đơn ngữ Êđê (corpus, ASR, language model)

### 4.1. Báo chí và phát thanh–truyền hình

| Nguồn | Dạng | Liên kết | Ghi chú |
|---|---|---|---|
| VOV4 — chuyên mục Êđê | web text | https://vov4.vov.vn/ede | đã khai thác trong corpus NIRVLab |
| VOV4 — Dân tộc Ê Đê | bài giới thiệu | https://vov4.vov.vn/xodang/node/225040 | ngữ liệu văn hóa |
| DRT Đắk Lắk — Thời sự tiếng Êđê | audio/video hàng ngày | https://drt.vn/thoi-su-tieng-e-de | kho lớn, cập nhật liên tục |
| DRT — Chuyên mục truyền hình Êđê | video | https://drt.vn/chuyen-muc-truyen-hinh-tieng-e-de | comparable với bản tiếng Việt cùng ngày |
| Cổng DRT | trang chủ | https://drt.vn/ | phát tiếng Kinh, Êđê, M’nông |

**Gợi ý:** bản tin Êđê và bản tin tiếng Việt **cùng ngày** trên DRT tạo **corpus so sánh** (comparable corpus), chưa căn câu. Có thể căn đoạn bằng embedding, rồi pivot sang Anh.

### 4.2. Sách giáo khoa

Nhà xuất bản Giáo dục Việt Nam (2021–2024) biên soạn SGK tiếng dân tộc lớp 1–5, gồm **tiếng Êđê**, đã được Bộ GD&ĐT phê duyệt (80 đầu sách cho 8 thứ tiếng).

- Tin: https://www.vietnamplus.vn/bien-soan-sach-giao-khoa-tieng-dan-toc-tu-lop-1-den-lop-5-voi-8-thu-tieng-post1064805.vnp
- NXBGDVN: https://nxbgd.vn/bai-viet/bien-soan-sgk-tieng-dan-toc-hanh-trinh-nhieu-gian-nan-nhung-day-tu-hao

Đây là ngữ liệu sư phạm song ngữ (Êđê–Việt), **không phải dataset mở** để tải hàng loạt.

### 4.3. Audio hiện trường (CREM–CNRS)

Kho âm thanh CNRS / Musée de l’Homme — nhạc, thơ hát, sử thi Êđê.

Ví dụ:

- Tang lễ Êđê (1957, Buôn Pan Lam): https://archives.crem-cnrs.fr/archives/items/CNRSMH_I_1958_008_004_01/
- Thơ hát đối *Klei Ekei Mnie* (1961): https://archives.crem-cnrs.fr/archives/items/CNRSMH_I_1972_013_006_01/
- Sử thi hát *Klei Y Du Hbia Mlin* (1961, làng Jung): https://archives.crem-cnrs.fr/archives/items/CNRSMH_I_1972_013_027_02/

Bộ sưu tập: *Viet Nam, Musiques des Edê sur les Hauts plateaux du Centre* (Anne de Hauteclocque, 1961).

Pangloss (LACITO-CNRS) là kho ngữ liệu nói đa ngôn ngữ: https://pangloss.cnrs.fr/ — cần kiểm tra thêm khi tìm corpus có phiên âm.

---

## 5. Sách, từ điển, ngữ liệu in

### 5.1. Công trình Việt Nam (Êđê–Việt; dataset thường không công bố)

**Kho ngữ vựng / dịch máy:**

- Phan Thị Huyến và cộng sự (ĐH Đà Nẵng): mô hình tương tác xây kho ngữ vựng song ngữ Việt–Êđê. Từ điển Êđê–Việt khoảng **10.000** mục; Việt–Êđê khoảng **1.000** mục; kho Việt kế thừa VLSP > 31.000 mục.  
  PDF: https://jst-ud.vn/jst-ud/article/download/2891/2891/6621
- IJERT — chuyển dữ liệu thô thành kho từ vựng có cấu trúc:  
  https://www.ijert.org/conversion-system-raw-data-into-structured-data-in-building-the-vietnamese-ede-bilingual-vocabulary-corpus
- IJERT — dịch máy Việt–Êđê cho bản tin khí tượng: corpus **31.248 mục Việt** + **2.500 mục Êđê**; thử nghiệm tại Đài PTTH Đắk Lắk.  
  https://www.ijert.org/building-a-vietnamese-ede-machine-translation-based-on-the-bilingual-corpus

Các kho này **không thấy bản tải công cộng** trên Hugging Face / GitHub.

**Ngữ âm – phương ngữ – ngữ pháp:**

| Công trình | Năm | Ghi chú | Truy cập |
|---|---|---|---|
| Đoàn Văn Phúc, *Ngữ âm tiếng Êđê* | 1996 | NXB Khoa học Xã hội, 287 trang | https://repository.vnu.edu.vn/handle/VNU_123/86117 |
| Đoàn Văn Phúc, *Từ vựng các phương ngữ Êđê / Lexique des dialectes Êđê* | 1998 | NXB Tổng Hợp / ĐHQGHN & EFEO, 172 trang; 9 phương ngữ | https://repository.vnu.edu.vn/handle/VNU_123/84248 |
| Đoàn Văn Phúc & Tạ Văn Thông, *Ngữ pháp tiếng Ê đê* | 2008 | UBND Đắk Lắk & Viện Ngôn ngữ học | thư viện / NXB |
| Viện Ngôn ngữ học, *Ngữ pháp tiếng Êđê* | 2011 | NXB Giáo dục Việt Nam | sách in |
| Phan Văn Phức, *Cấu tạo từ tiếng Êđê* | 1993 | luận án, ĐHQG Hà Nội | thư viện |
| *Sách học tiếng Êđê dạy cán bộ công chức* | 2004 | Xí nghiệp in Đắk Lắk | sách in |

Bài so sánh Êđê–Việt: https://jst-ud.vn/jst-ud/article/view/2436

### 5.2. Tài liệu Pháp (rất giàu; có thể pivot sang Anh)

| Công trình | Năm | Dạng | Truy cập |
|---|---|---|---|
| Léopold Sabatier, *La Chanson de Damsan* | 1927 / 1933 | **Sử thi Đam San song ngữ Êđê–Pháp** | BEFEO 33: 143–302; bản số hóa: https://humazur.univ-cotedazur.fr/s/humazur/item/23393 |
| Davias-Baudrit, *Dictionnaire rhadé–français* | 1966 | từ điển, 5+510 trang, Đà Lạt | https://odsas.net/set/19 |
| Benjamin Louison, *Dictionnaire rhadé–français* | 1964 | từ điển, 216 trang; kèm Shintani về ngữ âm | https://www.odsas.net/collection/6 |
| Tadahiko L.A. Shintani, *Études phonétiques de la langue Rhadé* | 1981 | ngữ âm | Journal of African and Asian Studies 21: 120–129 |

Sử thi Đam San được công nhận di sản văn hóa phi vật thể quốc gia (2014). Các bản Việt sau này (ví dụ Đào Từ Chi, 1959) là dịch/phóng tác, **không thay** bản Sabatier Êđê–Pháp.

Hiện **chưa thấy** bản dịch Anh đầy đủ, công bố rộng của Đam San.

### 5.3. Catalog tổng hợp

- SIL Language page Rade: https://www.sil.org/language/rad
- SIL: *Proto-Malayo-Polynesian reflexes in Rade, Jarai and Chru* (Thomas 1963) — không phải corpus, nhưng hữu ích so sánh Chamic

---

## 6. Ước lượng hiện trạng ngữ liệu

| Loại | Cặp | Quy mô khả dụng | Chất lượng | Trạng thái mở |
|---|---|---|---|---|
| Câu song ngữ NLP | Êđê–Việt | ~17.000 (sạch) / ~210.000 (thô) | khá / cần lọc | có (Hugging Face) |
| Câu song ngữ NLP | **Anh–Êđê** | **0 dataset công bố** | — | không |
| Từ điển | Anh–Êđê | hàng nghìn mục (Tharp 1980) | cao | PDF CC BY-SA |
| Wordlist | Anh–Êđê–Việt | 247 (ABVD) + 281 (SIL) | cao | có |
| Giáo trình / từ vựng SIL | ba ngữ | bài học + ~345 trang từ vựng | cao | PDF / scan |
| Verse Kinh Thánh (tự căn) | Anh–Êđê | ~30.000 câu | cao, lệch miền tôn giáo | bản quyền UBS |
| Pivot En ← Vi ← Ede | Anh–Êđê | có thể mở rộng từ 17k | trung bình | tùy giấy phép từng nhánh |
| Báo chí comparable | Êđê ∥ Việt | liên tục (VOV4, DRT) | chưa căn câu | web, cần tôn trọng bản quyền |
| Audio hiện trường | đơn ngữ / dân tộc nhạc | hàng giờ (CREM) | tư liệu gốc | kho lưu trữ |
| Kho ĐH Đà Nẵng / khí tượng | Việt–Êđê | 1.000–10.000 mục / 2.500 thuật ngữ | học thuật | **không thấy bản mở** |

---

## 7. Chiến lược dựng dataset Anh–Êđê (thực tế)

Vì không có corpus `en–rad` sẵn, thứ tự ưu tiên:

### Bước 1 — Lexicon vàng (làm ngay, giấy phép rõ)

1. Parse / OCR **Tharp 1980** (CC BY-SA) → TSV `ede \t en \t pos \t etym \t example`.
2. Gộp **SIL 281 mục** + **ABVD 247 mục**.
3. Bổ sung từ vựng SIL 1979 (ba ngữ) nếu OCR được.

### Bước 2 — Câu song ngữ chất lượng cao

1. Tải *Klei Aê Diê Blŭ* 2015 + một bản Anh (ưu tiên WEB nếu cần phân phối nghiên cứu).
2. Căn theo verse ID.
3. Xin phép UBS / Hội Thánh Kinh nếu công bố corpus.

### Bước 3 — Pivot qua tiếng Việt (tốt hơn dịch thẳng bằng LLM)

```
Êđê  ↔  Việt (NIRVLab 17k, người/căn nguồn)
Việt  ↔  Anh (OPUS, PhoMT, v.v.)
     ↓
Êđê  ↔  Anh  (cặp gián tiếp)
```

Chỉ dùng làm pretrain. **Bắt buộc** người Êđê hậu kiểm trước khi gọi là gold.

### Bước 4 — Corpus so sánh báo chí

- Cặp DRT/VOV4 Êđê ↔ Việt cùng ngày.
- Căn đoạn bằng mô hình đa ngữ.
- Pivot đoạn Việt → Anh nếu cần cặp Anh.

### Những gì **không** nên làm

- Không lấy dataset *Edo* / *Ewe* trên Hugging Face.
- Không dùng EViRAL làm bản dịch vàng.
- Không huấn luyện MT trên `HeyDunaX/rhade-vi-delete-original` khi chưa lọc.
- Không coi bản dịch máy ViEde (BLEU 22,8) là ngữ liệu chuẩn.

---

## 8. Danh sách URL ưu tiên (copy nhanh)

### Dataset và mô hình

```
https://huggingface.co/datasets/NIRVLab/rhade-vietnamese-mt
https://huggingface.co/datasets/HeyDunaX/rhade-vi-delete-original
https://huggingface.co/datasets/NIRVLab/EViRAL
https://huggingface.co/YPHIC
https://huggingface.co/spaces/YPHIC/rhade-ai-api
https://huggingface.co/NIRVLab/ViEde
```

### Từ điển / wordlist Anh–Êđê

```
http://sealang.net/archives/pl/pdf/PL-C58.pdf
https://doi.org/10.15144/pl-c58
https://archive.org/details/rhadeenglishdict0000thar
https://www.sil.org/resources/archives/30996
https://www.sil.org/resources/archives/30993
https://www.sil.org/resources/archives/43372
https://archive.org/details/rosettaproject_rad_morsyn-1
https://lpan.eva.mpg.de/austronesian/language.php?id=741
```

### Kinh Thánh / catalog ngôn ngữ

```
https://www.bible.com/languages/rad
https://www.scriptureearth.org/00eng.php?iso=rad
https://kinhthanh.httlvn.org/?v=RVV11
https://joshuaproject.net/languages/rad
https://globalrecordings.net/en/language/rad
http://olac.ldc.upenn.edu/language/rad
https://glottolog.org/resource/languoid/id/rade1240
https://wals.info/languoid/lect/wals_code_rad
https://en.wikipedia.org/wiki/Rade_language
```

### Báo chí, sách, kho Pháp

```
https://vov4.vov.vn/ede
https://drt.vn/thoi-su-tieng-e-de
https://drt.vn/chuyen-muc-truyen-hinh-tieng-e-de
https://jst-ud.vn/jst-ud/article/download/2891/2891/6621
https://www.ijert.org/building-a-vietnamese-ede-machine-translation-based-on-the-bilingual-corpus
https://repository.vnu.edu.vn/handle/VNU_123/86117
https://repository.vnu.edu.vn/handle/VNU_123/84248
https://odsas.net/set/19
https://www.odsas.net/collection/6
https://humazur.univ-cotedazur.fr/s/humazur/item/23393
https://archives.crem-cnrs.fr/
```

---

## 9. Gợi ý trích dẫn tối thiểu

Tharp, J. A., & Buon-Ya, Y-B. (1980). *A Rhade–English dictionary, with English–Rhade finderlist.* Pacific Linguistics C-58. The Australian National University. https://doi.org/10.15144/PL-C58

Y-Chang Niê Siêng. (1979). *Klei hriăm boh blŭ Êđê = Rade vocabulary.* Summer Institute of Linguistics.

Đoàn Văn Phúc. (1996). *Ngữ âm tiếng Êđê.* NXB Khoa học Xã hội.

Đoàn Văn Phúc. (1998). *Từ vựng các phương ngữ Êđê.* NXB Tổng Hợp / EFEO.

Sabatier, L. (1933). La chanson de Damsan. *Bulletin de l’École française d’Extrême-Orient, 33,* 143–302.

Tran, N. D. (2025). *Rhade–Vietnamese Machine Translation Dataset.* Hugging Face. https://huggingface.co/datasets/NIRVLab/rhade-vietnamese-mt

United Bible Societies. (2015). *Klei Aê Diê Blŭ* (Rade Bible).

Greenhill, S. J., Blust, R., & Gray, R. D. (2008). The Austronesian Basic Vocabulary Database. *Evolutionary Bioinformatics, 4,* 271–283.

---

## 10. Việc nên làm tiếp theo

1. Tải và kiểm định `NIRVLab/rhade-vietnamese-mt` (thống kê độ dài, trùng lặp, miền).
2. Trích lexicon từ PDF Tharp 1980 thành TSV Anh–Êđê.
3. Phác pipeline căn Kinh Thánh `rad`–`en` thành corpus nghiên cứu (kèm ghi chú bản quyền).
4. Nếu có cộng tác viên người Êđê: hậu kiểm 500–1.000 câu pivot để có tập gold nhỏ.

---

*Tài liệu này là bản khảo sát nguồn mở / nguồn học thuật công bố trên internet và catalog thư viện, lập ngày 10/09/2026. Một số kho trong nước (ĐH Đà Nẵng, Đài PTTH Đắk Lắk, SGK) có thể chỉ chia sẻ nội bộ — cần liên hệ tác giả / cơ quan chủ quản trước khi tái sử dụng.*
