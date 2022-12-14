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
        private static string hardcodedPath = "C:\\Users\\kiril\\Documents\\kompas-save-as-html-addon\\dist\\";
        private static string hardcodedFileName = "geometry.stl";

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

            DocSaver.save(doc, additionFormat, hardcodedPath, hardcodedFileName);
            HtmlBuilder.build(hardcodedPath, hardcodedFileName);
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
                regKey.SetValue(
                    null,
                    System.Environment.GetFolderPath(Environment.SpecialFolder.System)
                        + @"\mscoree.dll"
                );
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

        protected static void Main(string[] arguments)
        {
            Console.Write("\n\n\n\nScript is running:\n");
            kompas = (KompasObject)ExMarshal.GetActiveObject("KOMPAS.Application.5");
            if (kompas == null) 
            {
                Console.WriteLine("App is not running");
                return;
            }
            Console.WriteLine("App has been connected");
            doc = (ksDocument3D)kompas.ActiveDocument3D();
            if (doc == null)
            {
                Console.WriteLine("Scene was not created");
                return;
            }
            Console.WriteLine("Scene is connected successfully");
            additionFormat = (ksAdditionFormatParam)doc.AdditionFormatParam();
            try 
            {
                DocSaver.save(doc, additionFormat, hardcodedPath, hardcodedFileName);
                Console.WriteLine("Geometry data is saved successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine("Geometry data was not saved");
                Console.WriteLine(e.Message);
                return;
            }
            try 
            {
                HtmlBuilder.build(hardcodedPath, hardcodedFileName);
                Console.WriteLine("HTML file is created successfully");
            }
            catch (Exception e)
            {
                Console.WriteLine("HTML file was not created");
                Console.WriteLine(e.Message);
                return;
            }
        }
    }

    public static class HtmlBuilder
    {
        public static void build(string dirPath, string fileName)
        {
            string[] html = File.ReadAllLines(dirPath + "pattern.html");

            using (StreamWriter writer = new StreamWriter(dirPath + "geometry.html", true))
            {
                for (int i = 0; i < 18; i++) writer.WriteLine(html[i]);
                writer.Write("\"http://localhost:2000\",");
                for (int i = 18; i < html.Length; i++) writer.WriteLine(html[i]);
            }
        }
    }

    public static class DocSaver
    {
        public static void save(ksDocument3D document, ksAdditionFormatParam format, string path, string fileName)
        {
            format.Init();
            format.format = (short)D3FormatConvType.format_STL;
            format.formatBinary = true;
            format.topolgyIncluded = false;
            format.step = 0.1;
            format.angle = 8;
            format.length = 16;
            try
            {
                bool status = document.SaveAsToAdditionFormat(path + fileName, format);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
            }
        }
    }

    public static class ExMarshal
    {
        internal const String OLEAUT32 = "oleaut32.dll";
        internal const String OLE32 = "ole32.dll";
        [System.Security.SecurityCritical]  
        public static Object GetActiveObject(String progID)
        {
            Object obj = null;
            Guid clsid;
            try
            {
                CLSIDFromProgIDEx(progID, out clsid);
            }
            catch (Exception)
            {
                CLSIDFromProgID(progID, out clsid);
            }
            GetActiveObject(ref clsid, IntPtr.Zero, out obj);
            return obj;
        }
        [DllImport(OLE32, PreserveSig = false)]
        [ResourceExposure(ResourceScope.None)]
        [SuppressUnmanagedCodeSecurity]
        [System.Security.SecurityCritical] 
        private static extern void CLSIDFromProgIDEx([MarshalAs(UnmanagedType.LPWStr)] String progId, out Guid clsid);
        [DllImport(OLE32, PreserveSig = false)]
        [ResourceExposure(ResourceScope.None)]
        [SuppressUnmanagedCodeSecurity]
        [System.Security.SecurityCritical] 
        private static extern void CLSIDFromProgID([MarshalAs(UnmanagedType.LPWStr)] String progId, out Guid clsid);
        [DllImport(OLEAUT32, PreserveSig = false)]
        [ResourceExposure(ResourceScope.None)]
        [SuppressUnmanagedCodeSecurity]
        [System.Security.SecurityCritical] 
        private static extern void GetActiveObject(ref Guid rclsid, IntPtr reserved, [MarshalAs(UnmanagedType.Interface)] out Object ppunk);
    }
}