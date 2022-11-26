using Kompas6API5;
using System;
using System.IO;
using Microsoft.Win32;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using KAPITypes;
using System.Runtime.Versioning;
using System.Security;
using System.Xml.Linq;
using Kompas6Constants3D;
using Kompas6Constants;
using System.Linq;
using static System.Windows.Forms.LinkLabel;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace KompasClassLibrary
{
  	[ClassInterface(ClassInterfaceType.AutoDual)]
    [Obsolete]
    public class Program
	{
		private static KompasObject? kompas;
        private static ksDocument3D? doc;
        private static ksAdditionFormatParam? additionFormat;
        private static string hardcodedSavePath = "C:\\Users\\kirill\\Documents\\";
        private static string hardcodedDistPath = hardcodedSavePath + "kompas-save-as-html-addon\\src\\dist\\";

		[return: MarshalAs(UnmanagedType.BStr)] 
		public string GetLibraryName()
		{
			return "Save as HTML Addon";
		}
		public void ExternalRunCommand([In] short command, [In] short mode, [In, MarshalAs(UnmanagedType.IDispatch)] object app)
		{
			KompasObject kompas = (KompasObject)app;
            doc = (ksDocument3D)kompas.ActiveDocument3D();
            additionFormat = (ksAdditionFormatParam)doc.AdditionFormatParam();

            DocSaver.save(doc, additionFormat, hardcodedSavePath);
            HtmlBuilder.build(hardcodedSavePath, hardcodedDistPath);
            kompas.ksMessage("HTML file has been successfully created");
		}
		#region COM Registration
		[ComRegisterFunction]
		public static void RegisterKompasLib(Type t)
		{
			try
			{
				RegistryKey regKey = Registry.LocalMachine;
				string keyName = @"SOFTWARE\Classes\CLSID\{" + t.GUID.ToString() + "}";
				regKey = regKey.OpenSubKey(keyName, true);
				regKey.CreateSubKey("Kompas_Library");
				regKey = regKey.OpenSubKey("InprocServer32", true);
				regKey.SetValue(null, System.Environment.GetFolderPath(Environment.SpecialFolder.System) + @"\mscoree.dll");
				regKey.Close();
			}
			catch (Exception ex)
			{
				MessageBox.Show(string.Format("Failed", ex));
			}
		}
		[ComUnregisterFunction]
		public static void UnregisterKompasLib(Type t)
		{
			RegistryKey regKey = Registry.LocalMachine;
			string keyName = @"SOFTWARE\Classes\CLSID\{" + t.GUID.ToString() + "}";
			RegistryKey subKey = regKey.OpenSubKey(keyName, true);
			subKey.DeleteSubKey("Kompas_Library");
			subKey.Close();
		}
		#endregion
	}
	public static class HtmlBuilder
    {
        public static void build(string savePath, string distPath)
        {
            string[] stp = File.ReadAllLines(savePath + "geometry.stp");
            string[] html = File.ReadAllLines(distPath + "pattern.html");

            using (StreamWriter writer = new StreamWriter(distPath + "geometry.html", true))
            {
                for (int i = 0; i < 13; i++)
                    writer.WriteLine(html[i]);
                foreach (var line in stp)
                    writer.WriteLine(line);
                for (int i = 14; i < stp.Length; i++)
                    writer.WriteLine(stp[i]);
            }
        }
    }
    public static class DocSaver
    {
        public static void save(ksDocument3D document, ksAdditionFormatParam format, string path)
        {
            format.Init();
            format.formatBinary = false;
            format.topolgyIncluded = false;
            format.step = 0.1;
            format.angle = 8;
            format.length = 16;
            format.format = (short)D3FormatConvType.format_STEP_AP242;
            try
            {
                bool status = document.SaveAsToAdditionFormat(path + "geometry.stp", format);
                System.Console.WriteLine(status);
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.ToString());
            }
        }
    }
}
