Attribute VB_Name = "modSeleniumBasic"
Sub sample()
    Dim Driver As New Selenium.WebDriver
    Dim text As String
    Driver.Start "chrome"
    Driver.Get "https://www.yahoo.co.jp/"
    
    
    Driver.FindElementById("tabTopics2").Click
    text = Driver.FindElementByClass("_6DIzENAk4vpfFNX30TE-P").text
    Debug.Print text
    Stop
    Driver.Close
    Set Driver = Nothing
End Sub
