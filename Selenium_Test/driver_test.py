import chromedriver_binary
from selenium.webdriver.common.by import By
from selenium import webdriver

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

# Google検索画面にアクセス
#driver.get('http://example.selenium.jp/reserveApp/')

driver.get('https://www.google.com/?hl=ja')

aa = driver.find_element(By.CLASS_NAME, 'gLFyf')
aa.send_keys('test')
driver.find_element(By.CLASS_NAME, 'gNO89b').click()

# ブラウザーを終了
driver.quit()