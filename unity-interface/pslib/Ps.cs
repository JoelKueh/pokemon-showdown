
using System;
using System.Diagnostics;
using UnityEngine;

namespace PsLib {
    public interface PsSerializable
    {
        // This interface requires nothing except that the implementer be serializable.
    }

    public class Ps
    {
        private static Ps _psManager;
        private static object _instLock = new object();

        private Process _sim;
        private Process _dex;
        private string _psRoot = Application.dataPath + "/pslib/pokemon-showdown/";

        private Ps() {
            // Spawn the simulator.
            _sim = new Process();
            _sim.StartInfo.FileName = _psRoot + "node";
            _sim.StartInfo.Arguments = _psRoot + "sim.js";
            _sim.StartInfo.UseShellExecute = false;
            _sim.StartInfo.RedirectStandardInput = true;
            _sim.StartInfo.RedirectStandardOutput = true;
            _sim.StartInfo.RedirectStandardError = true;
            _sim.Start();
            _sim.OutputDataReceived += (sender, args) =>
                UnityEngine.Debug.Log("sim received output: " + args.Data);
            _sim.ErrorDataReceived += (sender, args) =>
                UnityEngine.Debug.Log("sim received error: " + args.Data);
            _sim.BeginOutputReadLine();
            _sim.BeginErrorReadLine();

            // Spawn the dex.
            _dex = new Process();
            _dex.StartInfo.FileName = _psRoot + "node";
            _dex.StartInfo.Arguments = _psRoot + "dex.js";
            _dex.StartInfo.UseShellExecute = false;
            _dex.StartInfo.RedirectStandardInput = true;
            _dex.StartInfo.RedirectStandardOutput = true;
            _dex.StartInfo.RedirectStandardError = true;
            _dex.Start();
            _dex.OutputDataReceived += (sender, args) =>
                Console.WriteLine("dex received output: {0}", args.Data);
            _sim.ErrorDataReceived += (sender, args) =>
                Console.WriteLine("dex received error: {0}", args.Data);
            _dex.BeginOutputReadLine();
            _dex.BeginErrorReadLine();
        }

        ~Ps() {
            // Kill the processes that we spawned.
            _sim.Kill();
            _dex.Kill();
        }

        public static Ps GetInstance() {
            lock (_instLock) {
                if (_psManager == null) {
                    _psManager = new Ps();
                }
            }
            return _psManager;
        }
    }
}
