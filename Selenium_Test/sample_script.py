from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager # ここを変更

driver = webdriver.Chrome(ChromeDriverManager().install()) # ここを変更
driver.get('https://google.com')