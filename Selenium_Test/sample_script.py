import chromedriver_binary
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium import webdriver
import pandas as pd
from selenium.webdriver.support import expected_conditions as EC
import csv

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


def click_buken_gaiyo_index(driver: webdriver):

    par_tab = driver.find_elements(By.CSS_SELECTOR, '#mainContents > div.category_tab')
    print(par_tab)
    for num in range(1, 10):
        w_tab = driver.find_elements(By.CSS_SELECTOR, '#mainContents > div.category_tab > ul > li:nth-child(' + str(num) + ')')
        if w_tab[0].text == '物件概要':
            w_tab[0].click()
            break

    return True

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

def get_page_bukken_info(driver: webdriver):
    result = ''
    click_buken_gaiyo_index(driver)


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

    return [bukken_name, place, kotsu, hanbai_kosu, sokosu, kakaku, saita_kakakutai
    , sidohutan, shohiyo, madori, tatemono_menseki, tochi_menseki, kenpeiritu, kanseijiki
    , hikiwatasi_kano, tocho_kenri, kozo, seko, rifomu, yototiiki, timkou, sonota_seigen
    , sonota_gaiyo, kaisha_gaiyo]

def fnc_main():
    options = webdriver.ChromeOptions()

    # chromeの実行ファイルが格納されているパスを指定する。標準のChromeの使用であれば特に設定は必要ないが、Canaryを指定したい場合は必要な項目
    # Macの場合こんな感じみたい。Windowsの場合はショートカットやショートカットのリンク先のパスを指定すればOK
    # 指定しない場合はこの行自体なくてよい。以下の要領で適宜指定。
    #options.binary_location = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'

    #headlessの指定をする場合、以下が必要
    #options.add_argument('--headless')

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

    driver.get('https://suumo.jp/chukoikkodate/chiba/sc_matsudo/')
    driver.implicitly_wait(10)

    kobetu_bukken_link_list = driver.find_elements(By.CLASS_NAME, 'property_unit-title')

    bukken_list = []

    for i in range(len(kobetu_bukken_link_list)):
        bukken_index = str(i + 1)
        print(kobetu_bukken_link_list[i].id)
        print('#js-bukkenList > div:nth-child(' + bukken_index + ') > div.property_unit-content > div.property_unit-header > h2 > a')
        ele_link = driver.find_elements(By.CSS_SELECTOR, '#js-bukkenList > div:nth-child(' + bukken_index + ') > div.property_unit-content > div.property_unit-header > h2 > a')
        if len(ele_link) <= 0:
            continue
        print(ele_link[0].text)
        ele_link[0].click()
        driver.switch_to.window(driver.window_handles[1])

        # scraping
        bukken_list.append(get_page_bukken_info(driver))

        driver.close()
        driver.switch_to.window(driver.window_handles[0])


    # ブラウザーを終了
    driver.quit()

    pd.DataFrame(bukken_list).to_csv('test.csv', index=False, encoding='utf-8', quoting=csv.QUOTE_NONNUMERIC)


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
