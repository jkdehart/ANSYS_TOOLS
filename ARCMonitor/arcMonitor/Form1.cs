using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;

// This is the code for your desktop app.
// Press Ctrl+F5 (or go to Debug > Start Without Debugging) to run your app.
namespace arcMonitor
{

    public partial class Form1 : Form
    {
        //public string stagingDirFN;
        List<string> stagingDirFN = new List<string>();
        List<string> jobFileFN = new List<string>();
        List<string> jobDir = new List<string>();
        int updateFreq = 5000;
        int updateFreqDefault = 5000;
        //string[] solveText;
        FileData fd = new FileData();

        public class FileData
        {
            //public string userPath = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            //public string rmsPath = "\\Ansys\\v192\\RMS\\Jobs\\"; // Get this from the setup
            //public string userName = Environment.UserName;
            //public string workPath => userPath + "\\Ansys\\v192\\RMS\\Jobs\\" + userName + "/";
            public string workPath = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\Ansys\\v192\\RSM\\Jobs\\" + Environment.UserName;
            public string jobDef = "JobDefinition.xml";
            public string jobLog = "Job.log";
        }

        public Form1()
        {
            InitializeComponent();
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0 && ((DataGridView)sender)[e.ColumnIndex, e.RowIndex].GetType() == typeof(DataGridViewLinkCell))
            {
                string pid = dataGridView1.Rows[e.RowIndex].Cells["Staging"].Value.ToString();
                try {
                    Process.Start(@pid);
                }
                catch { }
                //MessageBox.Show(pid);
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            toolStripTextBox1.Text = updateFreqDefault.ToString();
            toolStripStatusLabel1.Text = "";
           
            dataBuilder(0);
            InitTimer();
        }

       
        private void toolStripButton1_Click(object sender, EventArgs e)
        {
            FileData wp = new FileData();
            // Dim myPath as String = Server.MapPath(...)
            var directories = Directory.GetDirectories(wp.workPath);
            var message = string.Join(Environment.NewLine, directories);
            MessageBox.Show(message);
        }

        private void dataGridView1_SelectionChanged(object sender, EventArgs e)
        {
            //var rowsCount = dataGridView1.SelectedRows.Count;
            //if (rowsCount == 0 || rowsCount > 1) return;

            try
            {
                var row = dataGridView1.SelectedRows[0];
                if (row == null) return;
                ResolveActionsForRow(row);
            }
            catch { }
            
        }

        private void ResolveActionsForRow(DataGridViewRow row)
        {
            // Fetch row number
            int rowNumb = row.Index;

            // Fetch the solve.out file data
            try {
                string fn = stagingDirFN[rowNumb].ToString() + "\\" + "solve.out";
                //string fn = @"\\\\wrb-srv05\\Staging\\wf2hw2xz.qkb\\solve.out";
                using (FileStream solveFileStream = new FileStream(fn, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    using (StreamReader solveFileReader = new StreamReader(solveFileStream))
                    {
                        string text = solveFileReader.ReadToEnd();
                        richTextBox1.Text = text;

                        if (text.Contains("********************************************"))
                        {
                            dataGridView1.Rows[rowNumb].Cells["Status"].Value = "Complete";
                            dataGridView1.Update();
                        }
                    }
                }
            
            }

            catch
            {
                richTextBox1.Text = "No File Found!!!";
            }

            // Fetch the Job.log file data
            try
            {
                string fn = jobFileFN[rowNumb].ToString();
                //string fn = @"\\\\wrb-srv05\\Staging\\wf2hw2xz.qkb\\solve.out";
                using (FileStream solveFileStream = new FileStream(fn, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    using (StreamReader solveFileReader = new StreamReader(solveFileStream))
                    {
                        string text = solveFileReader.ReadToEnd();
                        richTextBox2.Text = text;
                    }
                }

            }

            catch
            {
                richTextBox1.Text = "No File Found!!!";
            }

            statusUpdate();
        }

        private void statusUpdate()
        {
            toolStripStatusLabel1.Text = "Last Update: " + System.DateTime.Now.ToString();
        }

        private void dataBuilder(int selectedRow)
        {
            // Get list of directories
            string[] directories = Directory.GetDirectories(fd.workPath);

            var dirCnt = directories.Count();
            if (dirCnt == 0) return;

            // clear the datagridview
            dataGridView1.Rows.Clear();
            stagingDirFN.Clear();
            jobFileFN.Clear();
            jobDir.Clear();

            // Create the data grid rows
            foreach (string val in directories)
            {

                // Read JobDefinition.xml
                string fileName = Path.Combine(val, fd.jobDef);
                string logName = Path.Combine(val, fd.jobLog);
                XmlDocument xmlDoc = new XmlDocument();
                try { xmlDoc.Load(fileName); 

                    // set jobType, displayName, clientMachine, queue, stagingDir, userName
                    XmlNode displayName = xmlDoc.DocumentElement.SelectSingleNode("/JobDefinition/displayName");
                    XmlNode jobType = xmlDoc.DocumentElement.SelectSingleNode("/JobDefinition/jobType");
                    XmlNode ownerName = xmlDoc.DocumentElement.SelectSingleNode("/JobDefinition/RuntimeInformation/owner");
                    XmlNode clientMachine = xmlDoc.DocumentElement.SelectSingleNode("/JobDefinition/clientMachine");
                    XmlNode queueName = xmlDoc.DocumentElement.SelectSingleNode("/JobDefinition/Queue/name");
                    XmlNode clusterName = xmlDoc.DocumentElement.SelectSingleNode("/JobDefinition/Queue/clusterConfigurationName");
                    XmlNode stagingDir = xmlDoc.DocumentElement.SelectSingleNode("/JobDefinition/RuntimeInformation/stagingDirectory");

                    stagingDirFN.Add(stagingDir.InnerText);
                    jobFileFN.Add(logName);
                    jobDir.Add(val);

                    // Extract jobStatus from status.x file
                    string jobStatus_wPath = Directory.GetFiles(val, "*status*")[0].ToString();
                    string jobStatus = Path.GetFileName(jobStatus_wPath).Split('.')[1].ToString();

                    // build the data grid view
                    dataGridView1.Rows.Add(displayName.InnerText, jobType.InnerText, jobStatus, "TBD", ownerName.InnerText, clusterName.InnerText, queueName.InnerText, stagingDir.InnerText, "1s");
                    dataGridView1.AutoResizeColumns();
                    dataGridView1.Update();
                }
                catch { }
            }

            foreach(DataGridViewRow row in dataGridView1.Rows)
            {
                ResolveActionsForRow(row); 
            }

            // Select previous row
            try { dataGridView1.Rows[selectedRow].Selected = true; }
            catch { }
        }

        public void InitTimer()
        {
            
            timer1 = new Timer();
            timer1.Tick += new EventHandler(timer1_Tick);
            timer1.Interval = updateFreq; // in miliseconds
            timer1.Start();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            // get the selected row before the update so that it can be reselected after update
            //var rowsCount = dataGridView1.SelectedRows.Count;
            //if (rowsCount == 0)
            if (stagingDirFN.Count == 0)
            {
                noActiveJobs();
                dataBuilder(0);
            }
            else
            {
                if(stagingDirFN.Count != 0)
                {
                    try
                    {
                        var row = dataGridView1.SelectedRows[0];
                        int rowInt = row.Index;
                        dataBuilder(rowInt);
                    }
                    catch
                    {

                    }
                    
                }
                else
                {
                    noActiveJobs();
                    dataBuilder(0);
                    
                }
            }
           
            //if (row == null) return;

        }

        private void noActiveJobs()
        {
            dataGridView1.Rows.Clear();
            stagingDirFN.Clear();
            jobFileFN.Clear();
            jobDir.Clear();
            richTextBox1.Text = "";
            richTextBox2.Text = "";
            toolStripStatusLabel1.Text = "No active jobs...";
        }

        private void formRefresh()
        {
            {
                // get the selected row before the update so that it can be reselected after update
                //var rowsCount = dataGridView1.SelectedRows.Count;
                //if (rowsCount == 0 || rowsCount > 1) return;
                try
                {
                    dataGridView1.Rows.Clear();
                    var row = dataGridView1.SelectedRows[0];
                    int rowInt = row.Index;
                    //if (row == null) return;

                    richTextBox1.Text = "";
                    richTextBox2.Text = "";

                    // Perform update
                    dataBuilder(rowInt);
                }
                catch { }
            }
        }

        private void completedCheck()
        {

        }

        // Put row numbers up
        private void dataGridView1_RowPostPaint(object sender, DataGridViewRowPostPaintEventArgs e)
        {
            //this.dataGridView1.Rows[e.RowIndex].Cells[0].Value = (e.RowIndex + 1).ToString();
        }

        private void toolStripButton2_Click(object sender, EventArgs e)
        {
            formRefresh();
        }

        private void toolStripTextBox1_KeyPress(object sender, KeyPressEventArgs e)
        {
            
        }

        private void toolStripTextBox1_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (Convert.ToInt16(toolStripTextBox1.Text) < 5000)
                    {
                        updateFreq = updateFreqDefault;
                        toolStripTextBox1.Text = "5000";
                        timer1.Stop();
                        InitTimer();
                        
                    }
                    else
                    {
                        updateFreq = Convert.ToInt32(toolStripTextBox1.Text);
                        timer1.Stop();
                        InitTimer();
                    }
                }
                catch
                {
                    updateFreq = updateFreqDefault;
                    toolStripTextBox1.Text = "5000";
                    timer1.Stop();
                    InitTimer();
                    
                }
            }
        }

        private void dataGridView1_MouseClick(object sender, MouseEventArgs e)
        {
            if (e.Button == System.Windows.Forms.MouseButtons.Right)
            {

                contextMenuStrip1.Show(Cursor.Position.X, Cursor.Position.Y);
            }
        }

        private void dataGridView1_CellMouseDown(object sender, DataGridViewCellMouseEventArgs e)
        {
            //handle the row selection on right click
            if (e.Button == MouseButtons.Right)
            {
                try
                {
                    dataGridView1.CurrentCell = dataGridView1.Rows[e.RowIndex].Cells[e.ColumnIndex];
                    // Can leave these here - doesn't hurt
                    dataGridView1.Rows[e.RowIndex].Selected = true;
                    dataGridView1.Focus();

                    //int selectedBiodataId = Convert.ToInt32(dataGridView1.Rows[e.RowIndex].Cells[1].Value);
                }
                catch (Exception)
                {

                }
            }
        }

        private void abortToolStripMenuItem_Click(object sender, EventArgs e)
        {
      
            // get the selected row
            var rowsCount = dataGridView1.SelectedRows.Count;
            if (rowsCount == 0 || rowsCount > 1) return;
            var row = dataGridView1.SelectedRows[0];
            int rowInt = row.Index;
            if (row == null) return;

            //MessageBox.Show(rowInt.ToString());

            string message = "Are you sure you want to Abort this job?";
            string title = "Abort Job...";
            MessageBoxButtons buttons = MessageBoxButtons.YesNo;
            DialogResult result = MessageBox.Show(message, title, buttons);
            if (result == DialogResult.No)
            {
                //this.Close();
            }
            else
            {
                string fileName = "endbat.dat";
                string stagingFolder = stagingDirFN[rowInt];
                string fn = stagingFolder + "\\" + fileName;
                FileStream fs = File.Create(fn);
                //MessageBox.Show(fn);
            }

            //formRefresh();
        }

        private void removeToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // get the selected row
            var rowsCount = dataGridView1.SelectedRows.Count;
            if (rowsCount == 0 || rowsCount > 1) return;
            var row = dataGridView1.SelectedRows[0];
            int rowInt = row.Index;
            if (row == null) return;

            string folderToRemove = jobDir[rowInt];

            string message = "Are you sure you want to remove this directory?";
            string title = "Remove Job Directory";
            MessageBoxButtons buttons = MessageBoxButtons.YesNo;
            DialogResult result = MessageBox.Show(message, title, buttons);
            if (result == DialogResult.No)
            {
                //this.Close();
            }
            else
            {
                if (Directory.Exists(@folderToRemove))
                {
                    Directory.Delete(@folderToRemove, true);
                }

            }

            //formRefresh();

        }


        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {
            // set the current caret position to the end
            richTextBox1.SelectionStart = richTextBox1.Text.Length;
            // scroll it automatically
            richTextBox1.ScrollToCaret();
        }

        private void richTextBox2_TextChanged(object sender, EventArgs e)
        {
            // set the current caret position to the end
            richTextBox2.SelectionStart = richTextBox2.Text.Length;
            // scroll it automatically
            richTextBox2.ScrollToCaret();
        }

        private void toolStripButton1_Click_1(object sender, EventArgs e)
        {
            MessageBox.Show("Are you sure you want to delete finished directores?");
        }

        private void saveRestartFileToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // get the selected row
            var rowsCount = dataGridView1.SelectedRows.Count;
            if (rowsCount == 0 || rowsCount > 1) return;
            var row = dataGridView1.SelectedRows[0];
            int rowInt = row.Index;
            if (row == null) return;

            //MessageBox.Show(rowInt.ToString());

            string message = "Are you sure you want to create a restart point?";
            string title = "Create Restart Point...";
            MessageBoxButtons buttons = MessageBoxButtons.YesNo;
            DialogResult result = MessageBox.Show(message, title, buttons);
            if (result == DialogResult.No)
            {
                //this.Close();
            }
            else
            {
                string fileName = "savenow.dat";
                string stagingFolder = stagingDirFN[rowInt];
                string fn = stagingFolder + "\\" + fileName;
                FileStream fs = File.Create(fn);
                //MessageBox.Show(fn);
            }

            //formRefresh();
        }
    }
}
