import chromedriver_binary
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium import webdriver
import pandas as pd
from selenium.webdriver.support import expected_conditions as EC
import csv
from selenium.webdriver.support.select import Select
from urllib.parse import urlparse
import requests
import io
from PIL import Image
import os
import time

css_bukken_name     = '#mainContents > div:nth-child(2) > div > h3'

css_bukken_base = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(【tate】) > td:nth-child(【yoko】)'

css_place           = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)'
css_kotsu           = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(4)'
ccs_hanbai_kosu     = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)'
css_sokosu          = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(4)'
css_kakaku          = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)'
css_saita_kakakutai = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(4)'
css_sidohutan       = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2)'
css_shohiyo         = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(4)'
css_madori          = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(2)'
css_tatemono_menseki= '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(4)'
css_tochi_menseki   = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(7) > td:nth-child(2)'
css_kenpeiritu      = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(7) > td:nth-child(4)'
css_kanseijiki      = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(2)'
css_hikiwatasi_kano = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(4)'
css_tocho_kenri     = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(9) > td:nth-child(2)'
css_kozo            = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(9) > td:nth-child(4)'
css_seko            = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(10) > td:nth-child(2)'
css_rifomu          = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(10) > td:nth-child(4)'
css_yototiiki       = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(11) > td:nth-child(2)'
css_timkou          = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(11) > td:nth-child(4)'
css_sonota_seigen   = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(12) > td'
css_sonota_gaiyo    = '#mainContents > div:nth-child(2) > table > tbody > tr:nth-child(13) > td'
css_kaisha_gaiyo    = '#mainContents > div:nth-child(4) > table > tbody > tr:nth-child(1) > td > div > p'

def crouwded_kaihi(driver: webdriver.chrome.webdriver.WebDriver, next_page: str):
    ele_crowded_list = driver.find_elements(By.CSS_SELECTOR, 'body > div.wrapper.item > div > div.ui-section-header > h1')
    if len(ele_crowded_list) >= 1:
        if 'アクセスが集中' in ele_crowded_list[0].text:
            time.sleep(60)
            driver.get(next_page)
    
    return 

def click_buken_gaiyo_index(driver: webdriver.chrome.webdriver.WebDriver):

    par_tab = driver.find_elements(By.CSS_SELECTOR, '#mainContents > div.category_tab')
    print(par_tab)
    for num in range(1, 10):
        w_tab = driver.find_elements(By.CSS_SELECTOR, '#mainContents > div.category_tab > ul > li:nth-child(' + str(num) + ')')
        if w_tab[0].text == '物件概要':
            w_tab[0].click()
            break

    return True

# この方式は速度の問題があるため却下
# def get_bukken_content_by_key(driver: webdriver, search_key: str):
#     result = ''
#     for tate_cnt in range(1, 20):
#         for yoko_cnt in range(2, 5, 2):
#             search_str = css_bukken_base.replace('【tate】', str(tate_cnt)).replace('【yoko】', str(yoko_cnt))

#             ele = driver.find_elements(By.CSS_SELECTOR, search_str)
#             if len(ele) <= 0:
#                 continue
#             if ele[0].text == search_key:
#                 result_str = css_bukken_base.replace('【tate】', str(tate_cnt)).replace('【yoko】', str(yoko_cnt + 1))
#                 result_ele = driver.find_elements(By.CSS_SELECTOR, result_str)
#                 return result_ele[0].text


def get_text_from_ele(ele_list):
    if len(ele_list) <= 0:
        return ''
    return ele_list[0].text

def get_csv_header():
    bukken_name =  '物件名'
    place  = '所在地'
    kotsu  = '交通'
    hanbai_kosu  = '販売戸数'
    sokosu  = '総戸数'
    kakaku  = '価格'
    saita_kakakutai  = '最多価格帯'
    sidohutan  = '私道負担・道路'
    shohiyo  = '諸費用'
    madori  = '間取り'
    tatemono_menseki  = '建物面積'
    tochi_menseki  = '土地面積'
    kenpeiritu  = '建ぺい率・容積率'
    kanseijiki  = '完成時期(築年月)'
    hikiwatasi_kano  = '引渡可能時期'
    tocho_kenri  = '土地の権利形態'
    kozo  = '構造・工法'
    seko  = '施工'
    rifomu  = 'リフォーム'
    yototiiki  = '用途地域'
    timkou  = '地目'
    sonota_seigen  = 'その他制限事項'
    sonota_gaiyo  = 'その他概要・特記事項'
    kaisha_gaiyo  = '会社概要'
    cur_url = 'URL'
    return [bukken_name, place, kotsu, hanbai_kosu, sokosu, kakaku, saita_kakakutai
    , sidohutan, shohiyo, madori, tatemono_menseki, tochi_menseki, kenpeiritu, kanseijiki
    , hikiwatasi_kano, tocho_kenri, kozo, seko, rifomu, yototiiki, timkou, sonota_seigen
    , sonota_gaiyo, kaisha_gaiyo, cur_url]

def get_bukken_shosai_info(driver: webdriver.chrome.webdriver.WebDriver):
    result = ''
    click_buken_gaiyo_index(driver)
    print(type(driver))

    bukken_name = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_bukken_name))
    # place = get_bukken_content_by_key(driver, '所在地')
    # kotsu = get_bukken_content_by_key(driver,'交通')
    place = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_place))
    kotsu = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_kotsu))
    hanbai_kosu = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, ccs_hanbai_kosu))
    sokosu = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_sokosu))
    kakaku = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_kakaku))
    saita_kakakutai = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_saita_kakakutai))
    sidohutan = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_sidohutan))
    shohiyo = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_shohiyo))
    madori = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_madori))
    tatemono_menseki = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_tatemono_menseki))
    tochi_menseki = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_tochi_menseki))
    kenpeiritu = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_kenpeiritu))
    kanseijiki = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_kanseijiki))
    hikiwatasi_kano = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_hikiwatasi_kano))
    tocho_kenri = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_tocho_kenri))
    kozo = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_kozo))
    seko = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_seko))
    rifomu = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_rifomu))
    yototiiki = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_yototiiki))
    timkou = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_timkou))
    sonota_seigen = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_sonota_seigen))
    sonota_gaiyo = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_sonota_gaiyo))
    kaisha_gaiyo = get_text_from_ele(driver.find_elements(By.CSS_SELECTOR, css_kaisha_gaiyo))
    cur_url = driver.current_url

    return [bukken_name, place, kotsu, hanbai_kosu, sokosu, kakaku, saita_kakakutai
    , sidohutan, shohiyo, madori, tatemono_menseki, tochi_menseki, kenpeiritu, kanseijiki
    , hikiwatasi_kano, tocho_kenri, kozo, seko, rifomu, yototiiki, timkou, sonota_seigen
    , sonota_gaiyo, kaisha_gaiyo, cur_url]

def save_bukken_pic(driver: webdriver.chrome.webdriver.WebDriver, bukken_url:str):
    if bukken_url[-1:] == '/':
        bukken_url = bukken_url[:-1]
    save_name = bukken_url.replace('/', '_')
#    css_gazo_base = '#js-mainImageCarouselNav > div.carousel_nav-list > div > div > ul > li:nth-child(【COUNT】)'
    css_gazo_base = '#js-mainImageCarouselNav > div.carousel_nav-list > div > div > ul:nth-child(【PAGE_COUNT】) > li:nth-child(【YOKO_COUNT】) > a'
    css_gazo_migi_slide_btn = '#js-mainImageCarouselNav > div.carousel_nav-next > a'
    css_ele_gazo_middle_base = '#js-lightbox > li:nth-child(【COUNT】) > div > a > span > img'

#    '#js-mainImageCarouselNav > div.carousel_nav-next > a'
    new_dir_path : str = save_name[:save_name.rfind('_')] 
    if not os.path.isdir:
        os.makedirs(new_dir_path)

    cnt = 0
    yoko_cnt = 0
    page_cnt = 1
    yoko_gazo_suu_max = 8
    while True:
        cnt += 1
        yoko_cnt += 1
        ele_gazo_small_list = driver.find_elements(By.CSS_SELECTOR, css_gazo_base.replace('【PAGE_COUNT】', str(page_cnt)).replace('【YOKO_COUNT】', str(yoko_cnt)))
        if len(ele_gazo_small_list) <= 0:
            break
        ele_gazo_small = ele_gazo_small_list[0]
        driver.execute_script("window.scrollTo(0, " + str(ele_gazo_small.location['y'] - 1200) + ");")
        ele_gazo_small.click()
        # ele_gazo_middle = driver.find_elements(By.CSS_SELECTOR, css_ele_gazo_middle)[0]
        css_ele_gazo_middle = css_ele_gazo_middle_base.replace('【COUNT】', str(cnt))
        ele_gazo_middle_list = driver.find_elements(By.CSS_SELECTOR, css_ele_gazo_middle)
        if len(ele_gazo_middle_list) <= 0:
            break
        ele_gazo_middle = ele_gazo_middle_list[0]
        src = ele_gazo_middle.get_attribute('src')
        if src:
            # 画像のバイト列取得
            img_content = requests.get(src).content
            # 画像に変換
            img_file = io.BytesIO(img_content)
            # 画像の表示
            img_open = Image.open(img_file)
            # 画像の保存
            img_open.save(new_dir_path + '\\' + save_name + '_' + str(page_cnt) + '_' + str(cnt) + '.jpg')

        if yoko_cnt == yoko_gazo_suu_max:
            slide_migi_btn = driver.find_elements(By.CSS_SELECTOR, css_gazo_migi_slide_btn)[0]
            slide_migi_btn.click()
            yoko_cnt = 0
            page_cnt += 1

    return

def read_bukken_ichiran_page(driver: webdriver, bukken_list):

    kobetu_bukken_link_list = driver.find_elements(By.CLASS_NAME, 'property_unit-title')

    for i in range(1, 2):
#    for i in range(len(kobetu_bukken_link_list)):
        bukken_index = str(i + 1)
        print(kobetu_bukken_link_list[i].id)
        print('#js-bukkenList > div:nth-child(' + bukken_index + ') > div.property_unit-content > div.property_unit-header > h2 > a')
        ele_link = driver.find_elements(By.CSS_SELECTOR, '#js-bukkenList > div:nth-child(' + bukken_index + ') > div.property_unit-content > div.property_unit-header > h2 > a')
        if len(ele_link) <= 0:
            continue
        print(ele_link[0].text)
        driver.execute_script("window.scrollTo(0, " + str(ele_link[0].location['y'] - 200) + ");")
        ele_link[0].click()
        driver.switch_to.window(driver.window_handles[1])

        # 画像保存
        cur_url = driver.current_url
        parse = urlparse(cur_url)
        save_bukken_pic(driver, parse.path)

        # 物件概要取得
        bukken_list.append(get_bukken_shosai_info(driver))

        driver.close()
        driver.switch_to.window(driver.window_handles[0])

    return

def click_next_btn(driver: webdriver.chrome.webdriver.WebDriver):
    css_next_btn1 = '#js-sectionBody-main > div:nth-child(2) > div.pagination.pagination_set-nav > p:nth-child(3) > a'
    css_next_btn2 = '#js-sectionBody-main > div:nth-child(2) > div.pagination.pagination_set-nav > p > a'
    ele_next_btn = driver.find_elements(By.CSS_SELECTOR, css_next_btn1)

    if len(ele_next_btn) <= 0:
        ele_next_btn = driver.find_elements(By.CSS_SELECTOR, css_next_btn2)
        if len(ele_next_btn) <= 0:
            return False # 次へボタンなし
        
        print(ele_next_btn[0].location)

        driver.execute_script("window.scrollTo(0, " + str(ele_next_btn[0].location['y'] - 200) + ");")
        ele_next_btn[0].click()
    return True

def fnc_main():
    options = webdriver.ChromeOptions()
    download_path = 'D:\github\Selenium_Test\download'
    #ダウンロードフォルダを変更する設定
    #特にしなくてもいい設定が混じっていると思うのでうまくやってください。(丸投げ)
    prefs = {}
    prefs['download.default_directory'] = download_path
    prefs['download.directory_upgrade'] = True
    prefs['download.extensions_to_open'] = ''
    prefs['download.prompt_for_download'] = False
    prefs['safebrowsing.enabled'] = True
    options.add_experimental_option("prefs", prefs)

    #chromeのドライバをconda, pip 以外でダウンロードすると、パスが通っていないため、
    #自分でパスを通す必要がある
    #driver_path = 'path/to/chromedriver'
    #driver = webdriver.Chrome(chromedriver_path, options=options)
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(5)
    bukken_list = []

    city_link_list = ['chiba/sc_matsudo/', 'chiba/sc_kashiwa/', 'chiba/sc_abiko/', 'chiba/sc_noda/', 'chiba/sc_ichikawa/', 'tokyo/sc_katsushika/']
    
    bukken_list.append(get_csv_header())

    for city in city_link_list:
        seni_page = 'https://suumo.jp/chukoikkodate/' + city
#        seni_page = 'https://suumo.jp/chukoikkodate/chiba/sc_matsudo/'
        driver.get(seni_page)
        crouwded_kaihi(driver, seni_page)
        #100件表示に変更
        sel_page_count = Select(driver.find_elements(By.NAME, 'pc')[0])
        sel_page_count.select_by_value('100')

        ele_page = driver.find_elements(By.CSS_SELECTOR,'#js-sectionBody-main > div:nth-child(2) > div.pagination.pagination_set-nav > ol')[0]
        print(ele_page)
         
         # 次へボタンクリック
        while click_next_btn(driver):
            read_bukken_ichiran_page(driver, bukken_list)

    # ブラウザーを終了
    driver.quit()

    pd.DataFrame(bukken_list).to_csv('test.csv', index=False, header = False, encoding='sjis', quoting=csv.QUOTE_NONNUMERIC)

fnc_main()
#html = driver.page_source.encode('utf-8')
#soup = BeautifulSoup(html, "html.parser")
#print(soup.select_one("#js-myKensakuJokenForm"))
#bukken_list = driver.find_elements(By.CLASS_NAME, 'property_unit')
#aa.send_keys('test')
#driver.find_element(By.CLASS_NAME, 'fwB fcRed fs16').click()l

#for bukkken in bukken_list:

#    print(bukkken.find_elements(By.CLASS_NAME, 'dottable-vm')[1].text)
#    print(bukkken.find_element(By.CLASS_NAME, 'dottable-value').text)
#    aa = bukkken.find_element(By.XPATH, '//*[contains(., "土地面積")]')
#    print(aa.text)
